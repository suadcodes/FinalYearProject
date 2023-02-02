// Imports ---------------------------------------
import express from 'express';
import cors from 'cors';
import database from './database.js';

// Configure express app -------------------------
const app = new express();

// Configure middleware --------------------------

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  app.use(cors({ origin: '*' }));

// Controllers -----------------------------------

const read = async (whereField, id, isUsersExtended) => {
  const sql = buildReadSql(whereField, id, isUsersExtended);
  try {
    const [result] = await database.query(sql);
    return (result.length === 0)
      ? { isSuccess: false, result: null,  message: 'No record(s) found' }
      : { isSuccess: true, result: result, message: 'Record(s) successfully recovered' };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  }
}
  
  const buildReadSql = (whereField, id, isUsersExtended) => {

    let innerSql = `SELECT 
      EventPlayers.EventID, 
      Players.PlayerID, 
      Name,
      ROW_NUMBER() OVER (PARTITION BY EventID ORDER BY EventPlayers.PlayerID) AS PlayerIndex
      FROM 
      EventPlayers INNER JOIN Players ON EventPlayers.PlayerID=Players.PlayerID
    `;

    if(id) innerSql += ` WHERE EventPlayers.EventID =${id}`; 

    const fields = [`t.EventID, Venue, 
      MAX(CASE WHEN PlayerIndex=1 THEN PlayerID END) AS Player1ID,
      MAX(CASE WHEN PlayerIndex=1 THEN Name END) AS Player1name,
      MAX(CASE WHEN PlayerIndex=2 THEN PlayerID END) AS Player2ID,
      MAX(CASE WHEN PlayerIndex=2 THEN Name END) AS Player2name `
    ]
    let sql= `
      SELECT 
       ${fields}
      FROM
      ( ( ${innerSql} ) t 
        INNER JOIN Events ON t.EventID=Events.EventID
      )
      GROUP BY EventID;`;
       
    return sql;   
  }
  const eventController = async (res, whereField, id, isUsersExtended) => {
    // Validate request
  
    // Access data
    const { isSuccess, result, message: accessorMessage } = await read(whereField, id, isUsersExtended);
    if (!isSuccess) return res.status(400).json({ message: accessorMessage });
    
    // Response to request
    res.status(200).json(result);
  };

//for single table without joins 
  const read2 = async (whereField, id, isUsersExtended,variant) => {
  const sql = buildReadSql2(whereField, id, isUsersExtended);
  try {
    const [result] = await database.query(sql);
    return (result.length === 0)
      ? { isSuccess: false, result: null,  message: 'No record(s) found' }
      : { isSuccess: true, result: result, message: 'Record(s) successfully recovered' };
  }
  catch (error) {
    return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
  };
  }
  const read3 = async (whereField, id, isUsersExtended,variant) => {
    const sql = buildReadSql3(whereField, id, isUsersExtended);
    try {
      const [result] = await database.query(sql);
      return (result.length === 0)
        ? { isSuccess: false, result: null,  message: 'No record(s) found' }
        : { isSuccess: true, result: result, message: 'Record(s) successfully recovered' };
    }
    catch (error) {
      return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
    };
    }
    const read4 = async (whereField, id, isUsersExtended,variant) => {
      const sql = buildReadSql4(whereField, id, isUsersExtended);
      try {
        const [result] = await database.query(sql);
        return (result.length === 0)
          ? { isSuccess: false, result: null,  message: 'No record(s) found' }
          : { isSuccess: true, result: result, message: 'Record(s) successfully recovered' };
      }
      catch (error) {
        return { isSuccess: false, result: null, message: `Failed to execute query: ${error.message}` };
      };
      }
  const buildReadSql2 = (whereField, id, isUsersExtended,variant) => {
    let sql;
    const table2 ='((Events INNER JOIN EventPlayers ON Events.EventID=EventPlayers.EventID) INNER JOIN Players ON EventPlayers.PlayerID=Players.PlayerID)';
    const fields2=['Venue','Players.Name'];
         sql =`SELECT DISTINCT ${'Venue'} FROM ${table2} ORDER BY Venue`;
    
    return sql;
  };
  const buildReadSql3 = (whereField, id, isUsersExtended) => {
    let sql;
    const table2 ='((Events INNER JOIN EventPlayers ON Events.EventID=EventPlayers.EventID) INNER JOIN Players ON EventPlayers.PlayerID=Players.PlayerID)';
    const fields2=['Players.Name'];
         sql =`SELECT DISTINCT ${'Players.Name'} FROM ${table2} ORDER BY Name LIMIT 0, 25`;
    
    return sql;
  };
  const buildReadSql4 = (whereField, id, isUsersExtended) => {
    let sql;
    const table2 ='((Events INNER JOIN EventPlayers ON Events.EventID=EventPlayers.EventID) INNER JOIN Players ON EventPlayers.PlayerID=Players.PlayerID)';
    const fields2=['Players.Name'];
         sql =`SELECT DISTINCT ${'Players.Name'} FROM ${table2} ORDER BY Name LIMIT 25, 50`;
    
    return sql;
  };
    const eventController2 = async (res, whereField, id, isUsersExtended,variant) => {
      // Validate request
    
      // Access data
      const { isSuccess, result, message: accessorMessage } = await read2(whereField, id, isUsersExtended,variant);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };
    const eventController3 = async (res, whereField, id, isUsersExtended,variant) => {
      // Validate request
    
      // Access data
      const { isSuccess, result, message: accessorMessage } = await read3(whereField, id, isUsersExtended);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };
    const eventController4 = async (res, whereField, id, isUsersExtended,variant) => {
      // Validate request
    
      // Access data
      const { isSuccess, result, message: accessorMessage } = await read4(whereField, id, isUsersExtended,variant);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };
  
  
// Endpoints -------------------------------------
// Events
app.get('/api/events',(req,res) => eventController(res,null,null,false));
app.get('/api/events/:id', (req,res) => eventController(res,"EventID",req.params.id,false));
app.get('/api/EventPlayerID/:id', (req,res) => eventController(res,"Player1ID",req.params.id,false));
//Venue 
app.get('/api/Venue', (req,res) => eventController2(res,"Venue",req.params.id,false,'Venue'));
app.get('/api/Players', (req,res) => eventController3(res,null,req.params.id,false));
app.get('/api/Players2', (req,res) => eventController4(res,null,req.params.id,false));



// Start server ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));