import providerProducts from "../models/providerProducts.models.js"
export async function getProvidersProducts(req,res){
    try {
        const foundProviderProducts = await providerProducts.find()
        if(!foundProviderProducts || foundProviderProducts.length === 0 ){
            return res.status(404).json({error:"No se econtraron proveedores"})
        }
        res.status(200).json(foundProviderProducts)
    } catch (error) {
        
    }
}
export async function addProviderProduct(req,res){
 const {name,razon_social,address,number,rfc,gmail,date} = req.body
 try {
  if(name == "" || razon_social == "" || address==""||number==""||rfc==""||gmail ==""){
    return res.status(400).json({error:"Debes rellenar todos los campos"})
  }
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
    res.status(201).json(saveProviderProducts)
 } catch (error) {
    
 }
}
export async function filterProviderProduct(req,res){
    const providerName = req.query.ProviderName
    const regex = new RegExp(providerName,'i')
  try {
    const foundProviderName = await providerProducts.find({razon_social:regex})
    if(!foundProviderName || foundProviderName.length === 0) {
    res.status(404).json({message:"No se encontro al vendedor"})
    console.log('No se encontro al vendedor')
    return
    }
    res.status(200).json(foundProviderName)
    console.log('Los vendedores encontrados son', foundProviderName)
  } catch (error) {
    console.log(error)
  }
}
export async function deleteProviderProduct(req,res){
  const id = req.params.id
  try {
    const foundProviderProduct = await providerProducts.findByIdAndDelete(id)
    if(!foundProviderProduct){
      return res.status(404).json({error:"No se encontro el producto"})
    }
    return res.status(200).json({message:"El proveedor se elimino correctamente"})
  } catch (error) {
    
  }
}