import providerProducts from "../models/providerProducts.models.js"
export async function getProvidersProducts(req,res){
    try {
        const foundProviderProducts = await providerProducts.find()
        if(!foundProviderProducts || foundProviderProducts.length === 0 ){
            res.json({error:"No se econtraron proveedores"})
        }
        res.json(foundProviderProducts)
    } catch (error) {
        
    }
}
export async function addProviderProducts(req,res){
 const {name,razon_social,address,number,rfc,gmail,date} = req.body
 try {
    const createProviderProducts = new providerProducts({
        name,
        razon_social,
        address,
        number,
        rfc,
        gmail,
        date
    })
    const saveProviderProducts = await createProviderProducts.save()
    res.json(saveProviderProducts)
 } catch (error) {
    
 }
}
export async function filterProviderProducts(req,res){
    const providerName = req.query.ProviderName
    const regex = new RegExp(providerName,'i')
  try {
   
    const foundProviderName = await providerProducts.find({name:regex})
   if(!foundProviderName || foundProviderName.length === 0) {
    res.status(404).json({error:"No se encontro el proveedor"})
   }
   res.json(foundProviderName)
  } catch (error) {
    console.log(error)
  }
}