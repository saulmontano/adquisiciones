from flask import Flask, request, jsonify
import json
from datetime import datetime
from flask_cors import CORS  # Importar CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Cargar datos del archivo JSON
def load_data():
    try:
        with open('data.json', 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return {"adquisiciones": []}  # Retornar una estructura de datos vacía si no existe el archivo

# Guardar datos en el  JSON
def save_data(data):
    with open('data.json', 'w') as file:
        json.dump(data, file, indent=4)

# Ruta para obtener todas las adquisiciones
@app.route('/adquisiciones', methods=['GET'])
def get_all_adquisiciones():
    data = load_data()
    return jsonify(data.get('adquisiciones', []))

# Ruta para obtener una adquisición por ID
@app.route('/adquisiciones/<int:id>', methods=['GET'])
def get_adquisicion_by_id(id):
    data = load_data()
    adquisiciones = data.get('adquisiciones', [])
    for adq in adquisiciones:
        if adq['id'] == id:
            return jsonify(adq)
    return jsonify({'error': 'Adquisición no encontrada'}), 404

# Ruta para crear una nueva adquisición
@app.route('/adquisiciones', methods=['POST'])
def create_adquisicion():
    request_data = request.get_json()
    required_fields = ['presupuesto', 'unidad', 'tipo', 'cantidad', 'valorUnitario', 'valorTotal', 'fecha', 'proveedor', 'documentacion']
    
    # Verificar si todos los campos requeridos están presentes
    if not all(key in request_data for key in required_fields):
        return jsonify({'error': 'Datos incompletos'}), 400

    data = load_data()
    adquisiciones = data.get('adquisiciones', [])
    new_id = max(adq['id'] for adq in adquisiciones) + 1 if adquisiciones else 1
    new_adquisicion = {
        'id': new_id,
        **request_data,
        'historial': []  # Inicializar historial vacío
    }
    adquisiciones.append(new_adquisicion)
    data['adquisiciones'] = adquisiciones
    save_data(data)
    return jsonify(new_adquisicion), 201

# Ruta para actualizar una adquisición por ID
@app.route('/adquisiciones/<int:id>', methods=['PUT'])
def update_adquisicion(id):
    request_data = request.get_json()
    data = load_data()
    adquisiciones = data.get('adquisiciones', [])
    for adq in adquisiciones:
        if adq['id'] == id:
            # Asegurarse de que 'historial' exista
            if 'historial' not in adq:
                adq['historial'] = []
            adq.update(request_data)
            adq['historial'].append({
                'cambio': request_data,
                'fecha': datetime.now().isoformat()
            })
            save_data(data)
            return jsonify(adq)
    return jsonify({'error': 'Adquisición no encontrada'}), 404

# Ruta para eliminar una adquisición por ID
@app.route('/adquisiciones/<int:id>', methods=['DELETE'])
def delete_adquisicion(id):
    data = load_data()
    adquisiciones = data.get('adquisiciones', [])
    adquisiciones = [adq for adq in adquisiciones if adq['id'] != id]
    if len(adquisiciones) < len(data.get('adquisiciones', [])):
        data['adquisiciones'] = adquisiciones
        save_data(data)
        return '', 204
    return jsonify({'error': 'Adquisición no encontrada'}), 404

# Ruta para obtener el historial de cambios de una adquisición
@app.route('/adquisiciones/<int:id>/historial', methods=['GET'])
def get_historial(id):
    data = load_data()
    adquisiciones = data.get('adquisiciones', [])
    for adq in adquisiciones:
        if adq['id'] == id:
            return jsonify(adq.get('historial', []))
    return jsonify({'error': 'Adquisición no encontrada'}), 404

if __name__ == '__main__':
    app.run(debug=True)
