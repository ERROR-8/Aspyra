const userSchema = require(`../modules/user`);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

exports.createUser = async(req,res) =>{
    try{
        const requester = req.user;
        if (!requester) return res.status(401).json({ error: 'Authorization required' });
        if (requester.role !== 'admin') return res.status(403).json({ error: 'Only admins can create users' });

        const body = { ...req.body };
        if (body.Password) {
            const salt = await bcrypt.genSalt(10);
            body.Password = await bcrypt.hash(body.Password, salt);
        } else {
            return res.status(400).json({ error: 'Password required' });
        }

        // Only admins can assign admin role; otherwise default to jobseeker
        body.role = body.role === 'admin' ? 'admin' : (body.role === 'recruiter' ? 'recruiter' : 'jobseeker');

        const user = await userSchema.create(body);
        res.json(user);
    }
    catch(err){
        console.error('Create user error', err);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

exports.getuser = async(req,res) => {
    try{
        const requester = req.user;
        if (!requester) return res.status(401).json({ error: 'Authorization required' });
        if (requester.role !== 'admin') return res.status(403).json({ error: 'Only admins can view user list' });

        const user = await userSchema.find();
        res.json(user);
    }
    catch(err){
        console.error('Get users error', err);
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester) return res.status(401).json({ error: 'Authorization required' });

        const targetId = req.params.id;
        // Only admins can update any user; others can only update themselves
        if (requester.role !== 'admin' && requester.id !== targetId) {
            return res.status(403).json({ error: 'You can only update your own profile' });
        }

        // Prevent password changes via this endpoint unless using dedicated change password endpoint
        const { Password, ...payload } = req.body;
        // Only admins may set role
        if (payload.role && requester.role !== 'admin') delete payload.role;

        const user = await userSchema.findByIdAndUpdate(targetId, payload, { new: true });
        res.json(user);
    } catch (err) {
        console.error('Update user error', err);
        res.status(500).json({ error: 'Failed to update user' });
    }
};

// Change password for the authenticated user
exports.changePassword = async (req, res) => {
    try {
        const requester = req.user;
        if (!requester) return res.status(401).json({ error: 'Authorization required' });

        const targetId = req.params.id;
        // Only allow changing own password (admins could implement resets elsewhere)
        if (requester.id !== targetId) return res.status(403).json({ error: 'You can only change your own password' });

        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current and new passwords are required' });
        }

        if (typeof newPassword !== 'string' || newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters' });
        }

        const user = await userSchema.findById(targetId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const match = await bcrypt.compare(currentPassword, user.Password);
        if (!match) return res.status(400).json({ error: 'Current password is incorrect' });

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(newPassword, salt);

        user.Password = hashed;
        await user.save();

        return res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Change password error', err);
        return res.status(500).json({ error: 'Failed to change password' });
    }
};

exports.deleteUser = async(req,res) => {
    try{
        const requester = req.user;
        if (!requester) return res.status(401).json({ error: 'Authorization required' });
        if (requester.role !== 'admin') return res.status(403).json({ error: 'Only admins can delete users' });

        await userSchema.findByIdAndDelete(req.params.id);
        res.json({ message: 'User Deleted Successfully' });
    }
    catch(err){
        console.error('Delete user error', err);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

