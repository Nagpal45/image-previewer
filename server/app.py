from flask import Flask, jsonify, send_file
from PIL import Image
from exifread import process_file
import os
from flask_cors import CORS
import rawpy

app = Flask(__name__)
CORS(app)
IMAGE_DIR = 'images'

def process_image(file_path):
    exif_info = {}
    # converted_path = ''
    try:
        with open(file_path, 'rb') as image_file:
            tags = process_file(image_file)
            for tag, value in tags.items():
                exif_info[str(tag)] = str(value)

        # Convert raw image to JPEG
        # with rawpy.imread(file_path) as raw:
        #     rgb = raw.postprocess()
        #     converted_image = Image.fromarray(rgb)
        #     # Save the converted image
        #     converted_path = 'images/converted/' + os.path.splitext(os.path.basename(file_path))[0] + '.jpg'
        #     converted_image.save(converted_path, 'JPEG')

    except Exception as e:
        print(f"Error processing image: {e}")

    return exif_info

def create_preview(file_path, preview_path):
    try:
        with rawpy.imread(file_path) as raw:
            rgb = raw.postprocess()
            converted_image = Image.fromarray(rgb)
            converted_image.thumbnail((2000, 2000))
            converted_image.save(preview_path, 'JPEG')
    except Exception as e:
        print(f"Error creating preview: {e}")

@app.route('/images')
def get_images():
    image_list = []
    files = os.listdir(IMAGE_DIR)
    
    for file_name in files:
        file_path = os.path.join(IMAGE_DIR, file_name)
        
        exif_info = process_image(file_path)
        image_list.append({
            'file_name': file_name,
            'exif_info': exif_info
        })
    return jsonify({'images': image_list})

# @app.route('/images/<filename>')
# def get_image(filename):
#     converted_path = 'images/converted/' + filename.replace(os.path.splitext(filename)[1], '.jpg')
#     return send_file(converted_path, mimetype='image/jpeg') 

@app.route('/image-preview/<filename>')
def get_image_preview(filename):
    file_path = os.path.join(IMAGE_DIR, filename)
    preview_path = 'images/previews/' + filename.replace(os.path.splitext(filename)[1], '_preview.jpg')

    if not os.path.exists(preview_path):
        create_preview(file_path, preview_path)

    return send_file(preview_path, mimetype='image/jpeg')

@app.route('/download/<filename>')
def download_image(filename):
    file_path = os.path.join(IMAGE_DIR, filename)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=8000)
