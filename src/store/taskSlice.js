import { createSlice,current } from "@reduxjs/toolkit";



const initialState = {
  tasks: [
    {
      id: 1, 
      taskTitle: 'Fix login bug',
      taskDetail: 'Resolve the issue where users cannot log in after the recent update.',
      taskStatus: 'todo',
    },
    {
      id: 2,  
      taskTitle: 'Create login API',
      taskDetail: 'Build and integrate the login API for authenticating users.',
      taskStatus: 'inDev',
    },
    {
      id: 3,  
      taskTitle: 'Design homepage layout',
      taskDetail: 'Design a responsive homepage layout for the website.',
      taskStatus: 'inDev',
    },
    {
      id: 4,  
      taskTitle: 'Test login functionality',
      taskDetail: 'Perform testing on the login functionality to ensure it works across different browsers.',
      taskStatus: 'inQa',
    },
    {
      id: 5, 
      taskTitle: 'Prepare production build',
      taskDetail: 'Build and prepare the app for production deployment.',
      taskStatus: 'done',
    },
    {
      id: 6,  
      taskTitle: 'Deploy app to production',
      taskDetail: 'Deploy the latest version of the app to the production server.',
      taskStatus: 'done',
    },
    {
      id: 7,  
      taskTitle: 'Write unit tests for homepage',
      taskDetail: 'Write unit tests for all the components used on the homepage.',
      taskStatus: 'todo',
    },
  ],
};


const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {

    addTask: (state, action) => {
      const newId = state.tasks.length + 1;    
      const newTask = { ...action.payload, id: newId };      
      state.tasks.push(newTask);  
      console.log('Current state:', current(state));
    },
    
    updateTask: (state, action) => {
      const { id, taskTitle, taskDetail, taskStatus } = action.payload;
      const task = state.tasks.find(task => task.id === id);      
      if (task) {
        task.taskTitle = taskTitle;
        task.taskDetail = taskDetail;
        task.taskStatus = taskStatus;
      }
    },

    deleteTask: (state,action)=>{
      const idToDelete = action.payload
      state.tasks = state.tasks.filter((task)=> task.id !== idToDelete)
    }
    
    
  },
});

export const { addTask,updateTask,deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
