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
  
  const buildReadSql2 = (whereField, id, isUsersExtended) => {

    let innerSql = `SELECT 
      EventPlayers.EventID, 
      Players.PlayerID, 
      Name,
      ROW_NUMBER() OVER (PARTITION BY EventID ORDER BY EventPlayers.PlayerID) AS PlayerIndex
    FROM 
      EventPlayers INNER JOIN Players ON EventPlayers.PlayerID=Players.PlayerID
    `;

    if(id) innerSql += ` WHERE EventPlayers.EventID =${id}`; 

    const fields = `t.EventID, Venue, 
      MAX(CASE WHEN PlayerIndex=1 THEN PlayerID END) AS Player1ID,
      MAX(CASE WHEN PlayerIndex=1 THEN Name END) AS Player1name,
      MAX(CASE WHEN PlayerIndex=2 THEN PlayerID END) AS Player2ID,
      MAX(CASE WHEN PlayerIndex=2 THEN Name END) AS Player2name `
      
    
    let sql= `
      SELECT 
       ${fields}
      FROM
      (
        (
          ${innerSql}
        ) t 
        INNER JOIN 
          Events ON t.EventID=Events.EventID
      )
      GROUP BY EventID;`;
      // console.log(sql);
    return sql;   
  }
    
    const read2 = async (whereField, id, isUsersExtended) => {
      const sql = buildReadSql2(whereField, id, isUsersExtended);
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
    
    const eventController2 = async (res, whereField, id, isUsersExtended) => {
      // Validate request
    
      // Access data
      const { isSuccess, result, message: accessorMessage } = await read2(whereField, id, isUsersExtended);
      if (!isSuccess) return res.status(400).json({ message: accessorMessage });
      
      // Response to request
      res.status(200).json(result);
    };
    
  
// Endpoints -------------------------------------
app.get('/api/events',(req,res) => eventController2(res,null,null,false));
app.get('/api/events/:id', (req,res) => eventController2(res,"EventID",req.params.id,false));
app.get('/api/events/EventPlayerID/:id', (req,res) => eventController2(res,"EventPlayerID",req.params.id,false));


// Start server ----------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server started on port ${PORT}`));

