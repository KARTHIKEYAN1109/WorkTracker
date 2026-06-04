const Work = require("../models/InvisibleWork")
const mongoose = require("mongoose") 

exports.addWork = async (req, res) => {
    try{
        const {category, context, beneficiary, outcome, effort} = req.body

        const work = new Work({
            user: req.user.id,
            category,
            context,
            beneficiary,
            outcome,
            effort
        })
        await work.save()

        res.status(201).json({
            message: "Work entry added",
            work
        })
    } catch (error){
        res.status(500).json({error: error.message})
    }
}

exports.getWork = async (req, res) => {
    try {
        const works = await Work.find({ user: req.user.id })

        res.json({
            count: works.length,
            works
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
exports.getStats = async (req, res) => {
    try {
        const stats = await Work.aggregate([
             {
                $match: {
             user: new mongoose.Types.ObjectId(req.user.id)
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ])

        res.json({
            stats
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteWork = async (req,res) => {
    try{
        const work = await Work.findById(req.params.id)

        if(!work) {
            return res.status(404).json({ message: "Work not found"})
        }
        if(work.user.toString()!== req.user.id){
            return res.status(401).json({ message: "Not authorized"})
        }
        await work.deleteOne()
        res.json({ message: "Work deleted successfully"})
    }catch(error) {
        res.status(500).json({error : error.message})
    }
}

exports.updateWork = async (req, res) => {
    try {
        const work = await Work.findById(req.params.id)

        if (!work) {
            return res.status(404).json({ message: "Work not found" })
        }

        // Check ownership
        if (work.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" })
        }

        const updatedWork = await Work.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json({
            message: "Work updated successfully",
            updatedWork
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}