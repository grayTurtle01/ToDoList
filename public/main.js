// Delete
strongs = document.getElementsByClassName('fa-trash')

for( strong of strongs )
  strong.onclick = function(){
    li = this.parentNode
    id = li.getAttribute("_id")
    deleteTask( id )
  }

async function deleteTask( id ){
  res = await fetch("/deleteTask/"+id, {
      method : "delete",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "id": id
      })
  })
  data = await res.json()
  console.log( data )
  location.reload()
}

//Update
bs = document.getElementsByTagName('b')

for( b of bs )
  b.onclick = function(){
    li = this.parentNode
    id = li.getAttribute("_id")
    updateTask( id )
  }



async function updateTask( id ){
  input_task = document.querySelector('#input_task')
  task_updated = input_task.value
  
  res = await fetch("/updateTask/"+id, {
      method : "put",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "task": task_updated
      })
  })
  data = await res.json()
  console.log( data )
  location.reload()
}

//Doned Task
is = document.getElementsByTagName('i')

for( i of is )
  i.onclick = function(){
    li = this.parentNode
    isDone = li.getAttribute("isDone")
    console.log(isDone)
    
    task_span = li.children[0]
    //console.log(isDone)
    
    if( isDone == "false" ){
      task_span.style.textDecoration = "line-through"
      isDone = true
      li.setAttribute("isDone", "true")
    }
    if( isDone == "true" ){
      task_span.style.textDecoration  = ""
      isDone = false
      li.setAttribute("isDone", "false")
    }
    
    id = li.getAttribute("_id")
    toogleTask( id, isDone )
  }



async function toogleTask( id, isDone ){
  
  res = await fetch("/toogleTask/"+id, {
      method : "put",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        "isDone": Boolean(isDone)
      })
  })
  data = await res.json()
  console.log( data )
  location.reload()
}

