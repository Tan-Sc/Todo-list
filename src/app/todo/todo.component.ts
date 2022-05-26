
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';;
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ITask } from '../model/task';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
    
    obj = JSON.parse(localStorage.getItem('task') || "[]")  ;
    
    todoForm !: FormGroup;
    //Khai bao
    tasks: ITask[] = this.obj
    inprogress: ITask[] = [];
    done: ITask[] = [];
    updateId! :any;
    isEditEnable: boolean = false;
    
    constructor(private fb: FormBuilder) { }

    ngOnInit(): void { 
        this.todoForm = this.fb.group({
            item: ['', Validators.required]
        })
    }

    //add Task
    addTask(){
        this.tasks.push({
            description:this.todoForm.value.item,
            done: false
        })
        localStorage.setItem('task', JSON.stringify(this.tasks));
        
        this.todoForm.reset()

    }

    //deleteTask
    deleteTask(i: number){
        this.tasks.splice(i,1);
       // localStorage.clear();
       localStorage.setItem('task', JSON.stringify(this.tasks));
    }

    //edit Task
    editTask(item: ITask , i: number){
        this.todoForm.controls['item'].setValue(item.description);
        this.updateId = i;
        this.isEditEnable = true;
    }

    updateTask(){
        this.tasks[this.updateId].description = this.todoForm.value.item;
        this.tasks[this.updateId].done = false;
        this.todoForm.reset();
        this.updateId= undefined;
        this.isEditEnable = false;
    }

    //Move Task
    drop(event: CdkDragDrop<ITask[]>) {
        if (event.previousContainer === event.container) {
            
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    };


}   