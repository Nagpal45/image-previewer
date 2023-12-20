from flask import Flask, jsonify, send_file
from PIL import Image
from exifread import process_file
import os
from flask_cors import CORS

app = Flask(__name__)
CORS = CORS(app, resources={r"/images": {"origins": "http://localhost:3000"}})
IMAGE_DIR = os.path.join('server', 'images')

def process_image(file_path):
    exif_info = {}
    try:
        with open(file_path, 'rb') as image_file:
            tags = process_file(image_file)
            for tag, value in tags.items():
                exif_info[str(tag)] = str(value)
    except Exception as e:
        print(f"Error extracting Exif information for {file_path}: {e}")

    return exif_info

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

    print(image_list)
    return jsonify({'images': image_list})

@app.route('/api/images/<filename>')
def get_image(filename):
    file_path = os.path.join(IMAGE_DIR, filename)
    return send_file(file_path, mimetype='image/jpeg')  

if __name__ == '__main__':
    app.run(debug=True, port=8000)
