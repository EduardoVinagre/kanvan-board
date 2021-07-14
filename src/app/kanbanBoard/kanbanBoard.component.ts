import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  lastStage: number;
  firstStage: number;
  taskName: string;

  ngOnInit() {
    // Each task is uniquely identified by its name. 
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
    this.firstStage = 0;
    this.lastStage = this.stagesNames.length - 1;
    this.taskName = "";
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }

  goForwardClick = (task: Task) => {
    if (task.stage < this.lastStage) {
      task.stage++;
      this.configureTasksForRendering();
    }
  }

  goBackwardClick = (task: Task) => {
    if (task.stage > this.firstStage) {
      task.stage--;
      this.configureTasksForRendering();
    }
  }

  addTask = (event: Event) => {
    if(event){
      event.preventDefault();
    }
    if (this.taskName.trim() !== '') {
      let newTask: Task = {
        name: this.taskName,
        stage: 0
      };
      this.tasks.push(newTask);
      this.configureTasksForRendering();
      this.taskName = "";
    }
  }

  deleteTask = (task: Task) => {
    let taskIndex = this.tasks.indexOf(task);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      this.configureTasksForRendering();
    }
  }
}

interface Task {
  name: string;
  stage: number;
}