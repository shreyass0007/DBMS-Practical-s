from pymongo import MongoClient
uri="mongodb://127.0.0.1:27017/"
client=MongoClient(uri)

db=client.todo_db
task_collection=db.tasks

# Insert function
def create_task(description):
    task={
        'task':description
    }
    result=task_collection.insert_one(task)
    print(f'task created with id:{result.inserted_id}')

while True:
    print("\n1. Create Task")
    print("2. View Tasks")
    print("3. Exit")

    choice=input("Enter your choice:")
    
    if choice=='1':
        description=input("Enter the task: ")
        create_task(description)
    elif choice=='2':
        print()
    elif choice=='3':
        break
    else:
        print("Provide a valid option")
