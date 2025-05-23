const asyncHandler = require('express-async-handler')

// import Category
const Category = require("../models/category.model")

//add category
async function addCategory(categories){
    try {
        const categoryData = new Category.insertMany(categories)
        const savedCategory = await categoryData.save()
        return savedCategory
    } catch (error) {
        console.log(error)
    }
}
exports.createCategory= async (req,res)=>{ 

    try {
        const categoryData = await addCategory(req.body)
        res.status(2001).json({message: "Category added successfully.", category:categoryData})
    }catch(error){
        res.status(500).json({error: "Failed to add category."})
        
    }
}

//find all categories
async function findAllCategory(){
    try {
        const categoryData = await Category.find()
        return categoryData
    } catch (error) {
        console.log(error)
    }
}

exports.getCategory = async (req, res)=>{
    try {
        const categoryData = await findAllCategory()
        if(categoryData.length != 0){
            res.json(categoryData)
        }else{
            res.status(404).json({error: "No category found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category."})
    }
} 

//find categories by id
async function findCategoryById(categoryId){
    try {
        const category = await Category.findById(categoryId)
        return category
    } catch (error) {
        console.log(error)
    }
}

exports.getCategoryById = async (req, res)=>{
    try {
        const category = await findCategoryById(req.params.categoryId)
        if (category) {
            res.json({ data: { category } });
          } else {
            res.status(404).json({ error: "Category by ID not found" });
          }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category."})
    }
} 


// //update category
// async function updateCategory (categoryId, dataToUpdate){
//     try {
//         const category = await Category.findByIdAndUpdate(categoryId, dataToUpdate, {new: true})
//         return category
//     } catch (error) {
//         console.log("Error in updating category",error)        
//     }
// }

// const updateCategoryById = asyncHandler( async(req,res)=>{
//     try{
//         const category = await updateCategory(req.params.categoryId, req.body)
//         if(category){
//              res.status(200).json({message:"category updated successfully.", category: category})
//         }else{
//             res.status(404).json({error: "category not found"})
//         }
//     }catch(error){
//         res.status(500).json({error: "Failed to update categorys."})
//     }
// })

//delete category
// async function deleteCategory(categoryId){
//     try {
//         const deletedCategory = await Category.findByIdAndDelete(categoryId) 
//         return deletedCategory
//     } catch (error) {
//        console.log(error) 
//     }
// }

// app.delete("/api/categories/:categoryId", async (req,res)=>{
//     try {
//         const deletedCategory = await deleteCategory(req.params.categoryId)
//         if(deletedCategory){
//             res.status(200).json({message: "Category Deleted Successfully."})
//         }else{
//             res.status(404).json({error: "Category not found"})
//         }
//     } catch (error) {
//         res.status(500).json({error: "Failed to delete Category."})
//     }
// })


