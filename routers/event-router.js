import { Router } from 'express';
import database from '../database.js';

const router = new Router();
//
//Query builders

const buildSetFields = (fields) => fields.reduce((setSQL, field, index) =>
    setSQL + `${field}=:${field}` + ((index === fields.length - 1) ? '' : ', '), 'SET '
);

const buildReadQuery = (id,variant) => {
    let sql;
    const table ='Events'
    const fields = ['EventID','Venue','Date','LocalBoxer','ForeignBoxer','Referee']
    switch(variant){
      case 'Venue':
      sql =`SELECT DISTINCT ${'Venue'} FROM ${table}`;
      break;
      case 'LocalBoxer':
      sql =`SELECT DISTINCT ${'LocalBoxer'} FROM ${table} ORDER BY 'LocalBoxer' `;
      break;
      case 'ForeignBoxer':
      sql =`SELECT DISTINCT ${'ForeignBoxer'}  FROM ${table} ORDER BY 'ForeignBoxer'`;
      break;
      default:
      sql = `SELECT ${fields} FROM ${table}`;
      if (id) sql += ` WHERE EventID=:ID`;
    }
    
    return {sql, data:{ID:id} };
  };

  const buildEventCreate = (record) => {
    let table ='Events';
    let mfields= ['Venue', 'Date'];
    const sql = `INSERT INTO ${table} ` + buildSetFields(mfields);  
    return{sql,data:record}
  };
  const buildDeleteQuery = () => {
    let table ='Events';
    return `DELETE FROM ${table} WHERE EventID =:EventID`;
  };
const buildUpdateQuery = () => {
  let table ='Events';
  let mfields= ['Venue', 'Date'];
  return `UPDATE ${table} ` + buildSetFields(mfields)+ ` WHERE EventID =:EventID`;  
  
}; 
//Data accessors

const create = async (createQuery) => {
  try {
    const status = await database.query(createQuery.sql,createQuery.data);
    const readQuery = buildReadQuery(status[0].insertId,null);
    const {isSuccess,result,message} = await read(readQuery);

    return isSuccess
      ? { isSuccess: true, result: result, message: 'Record(s) successfully recovered' }
      : { isSuccess: false, result: null,  message: `Failed to recover the inserted record: ${message}`};
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  }
};


const read = async (query) => {
   
    try {
      const [result] = await database.query(query.sql,query.data);
      return (result.length === 0)
        ? { isSuccess: false, result: null,  message: 'No record(s) found' }
        : { isSuccess: true, result: result, message: 'Record(s) successfully recovered' };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
    }
  };

  
  const deletefunction = async(sql,id)=>{
    try {
      const status = await database.query(sql,{EventID:id});
      return status[0].affectedRows ===0
        ? { isSuccess: false, result: null,  message: `Failed to delete record ${id}` }
        : { isSuccess: true, result: null, message: 'Record(s) successfully deleted' };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
    }

  };
  const updatefunction = async(sql,id,record)=>{
    try {
      const status = await database.query(sql,{...record,EventID:id});
      const readQuery = buildReadQuery(id,null);
      const {isSuccess,result,message} = await read(readQuery);
      return isSuccess
      ? { isSuccess: true, result: result, message: 'Record successfully recovered' }
      : { isSuccess: false, result: null,  message: `Failed to recover the updated record: ${message}`};
  }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
    }

  };
//Controllers

const geteventController = async (req,res,variant) => {
    const id = req.params.id;
    const query = buildReadQuery(id,variant);
      // Access data
      const { isSuccess, result, message: accessorMessage } = await read(query);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };

  
  const posteventController = async(req,res) => {
      // Access data
      const record = req.body;
      const query = buildEventCreate(record);
      const { isSuccess, result, message: accessorMessage } = await create(query);
      if (!isSuccess) return res.status(404).json({ message: accessorMessage });
      
      // Response to request
      res.status(201).json(result);
    };

    
    const deleteeventController = async(req,res) => {
        // Access data
        const id = req.params.id;
        const sql = buildDeleteQuery();
        const { isSuccess, result, message: accessorMessage } = await deletefunction(sql,id);
        if (!isSuccess) return res.status(404).json({ message: accessorMessage });
        
        // Response to request
        res.status(201).json(result);
      };

      const puteventController = async(req,res) => {
        //Validate request
        const id = req.params.id;
        const record = req.body;
        // Access data
        const sql = buildUpdateQuery();
        const { isSuccess, result, message: accessorMessage } = await updatefunction(sql,id,record);
        if (!isSuccess) return res.status(404).json({ message: accessorMessage });
        
        // Response to request
        res.status(200).json(result);
      };
  
//Endpoints

router.get('/events', (req,res) => geteventController(req,res,null));
router.get('/events/:id', (req,res) => geteventController(req,res,req.params.id,));
router.get('/Venue', (req,res) => geteventController(req,res,'Venue'));
router.get('/LocalBoxer', (req,res) => geteventController(req,res,'LocalBoxer'));
router.get('/ForeignBoxer', (req,res) => geteventController(req,res,'ForeignBoxer'));

router.post('/events',posteventController);

router.delete('/events/:id',deleteeventController);
router.put('/events/:id',puteventController);

export default router;