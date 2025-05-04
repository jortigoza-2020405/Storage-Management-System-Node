//Controlador de Cliente
import User from './user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import userModel from './user.model.js'

//test
export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}


//Registro (Cliente)
export const registerUser = async(req, res)=>{
    try {
      let data = req.body
  
      data.role = 'EMPLOYER'
      data.password = await encrypt(data.password)
  
      let user = new User(data)
      await user.save()
  
      return res.send({
        message: `Registered successfully, can be logged with username: ${user.username}`,
        success: true
      })
    } catch (error) {
      console.error('Error al registrar:', error.message)
      return res.status(500).send({
        message: 'General error with registering user',
        error: error.message,
        success: false
      })
    }
  }
  
//Login (Cliente)
export const loginUser = async(req, res)=>{
    try{

        let { userLoggin, password } = req.body
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        )
        if(User && await checkPassword(user.password, password)) {
            let loggedUser = {
                uid: user._id,
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await generateJwt(loggedUser)

            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        return res.status(400).send({message: 'Wrong email or password'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function'})
    }
}

export const updatePass = async (req, res) =>{
    try {
        const { id } = req.params;
        const {currentPassword, newPassword } = req.body;

        const user = await User.findById(id);
        if(!user) return res.status(404).send({message: 'User not found',  success: false});

        const isMatch = await checkPassword(user.password, currentPassword);
        if (!isMatch) return res.status(400).send({message: 'Incorrect current password',  success: false});

        user.password= await encrypt (newPassword);
        await user.save();

        return res.send ({message: "Password updated successfully", success: true})


    } catch (error) {   
        return res.status(500).send({message: 'General error updating password', error, success: false})
    }
}

// Actualizar (Cliente)

export const updateUser = async(req, res)=>{
    try{      
        let id = req.params.id
        let data = req.body
   
        let updatedUser = await userModel.findByIdAndUpdate( 
            id,
            data,
            {new: true} 
        )
        if(!updatedUser) return res.status(404).send({message: 'User not found and not updated', success: false})
        return res.send({message: 'User updated successfully', updatedUser})
    }catch(error){
        console.error('General error', error)
        return res.status(500).send({message: 'General error', error,  success: false})
    }
}

//Eliminar cuenta (Cliente)
export const deleteUser = async(req, res)=>{
    try{
        
        let id = req.params.id
        const { currentPassword } = req.body;
        const user = await User.findById(id);
        if(!user) return res.status(404).send({message: 'User not found',  success: false});
        const isMatch = await checkPassword(user.password, currentPassword);
        if (!isMatch) return res.status(400).send({message: 'Incorrect current password',  success: false});

        let deletedUser = await userModel.findByIdAndDelete({_id: id})
        if(!deletedUser) return res.status(404).send({message: 'User not found, not deleted',  success: false})
        return res.send({message: 'Deleted user successfully', deletedUser})
    }catch(error){
        console.error('General error', error)
        return res.status(500).send({message: 'General error', error,  success: false})
    }
}