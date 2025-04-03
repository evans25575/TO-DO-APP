from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

todos = [
    {"id": 1, "task": "Learn React", "completed": False, "start_time": "08:00", "end_time": "09:00", "alarm_enabled": False, "alarm_sound": "default"}
]

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    new_todo = request.get_json()
    # Set default values if not provided
    new_todo.setdefault('start_time', '')
    new_todo.setdefault('end_time', '')
    new_todo.setdefault('alarm_enabled', False)
    new_todo.setdefault('alarm_sound', 'default')
    new_todo['id'] = len(todos) + 1
    todos.append(new_todo)
    return jsonify(new_todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    updated_todo = request.get_json()
    for todo in todos:
        if todo['id'] == todo_id:
            todo.update(updated_todo)
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo['id'] != todo_id]
    return jsonify({"message": "Todo deleted"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)