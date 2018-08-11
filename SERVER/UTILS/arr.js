var users = [];

function push_users(id, name, room)
{
 users.push({id,name,room})
}

function retrieve_users()
{
    return users.map((param)=> param.name);


}

function pop_users(id)
{
    users = users.filter((param)=> param.id != id) 
    
}

function get_name(id)
{
    return users.filter((param)=> param.id == id) 
}


module.exports = {push_users,retrieve_users,pop_users,get_name};
