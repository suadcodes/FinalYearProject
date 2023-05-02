class Controller {

    constructor(accessor) {
      this.accessor = accessor;
    }
  
    // Methods

      get= async (req,res,variant) => {
      const id = req.params.id;
      
        // Access data
        const { isSuccess, result, message: accessorMessage } = await this.accessor.read(id,variant);
        if (!isSuccess) return res.status(400).json({ message: accessorMessage });
        
        // Response to request
        res.status(200).json(result);
  };
  
    
      post = async(req,res) => {
        // Access data
        const record = req.body;
  
        const { isSuccess, result, message: accessorMessage } = await this.accessor.create(record);
        if (!isSuccess) return res.status(404).json({ message: accessorMessage });
        
        // Response to request
        res.status(201).json(result);
  };
  
      
      delete = async(req,res) => {
          // Access data
          const id = req.params.id;
          const { isSuccess, result, message: accessorMessage } = await this.accessor.delete(id);
          if (!isSuccess) return res.status(404).json({ message: accessorMessage });
          
          // Response to request
          res.status(201).json(result);
  };
  
      put= async(req,res) => {
          //Validate request
          const id = req.params.id;
          const record = req.body;
          // Access data
          
          const { isSuccess, result, message: accessorMessage } = await this.accessor.update(record,id);
          if (!isSuccess) return res.status(404).json({ message: accessorMessage });
          
          // Response to request
          res.status(200).json(result);
  };
       
}
export default Controller;