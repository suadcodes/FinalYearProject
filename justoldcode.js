 /*`ROW_NUMBER() OVER (PARTITION BY EventID ORDER BY EventPlayers.PlayerID) AS
      MAX(CASE WHEN PlayerIndex=1 THEN PlayerID END) AS Player1ID,
      MAX(CASE WHEN PlayerIndex=1 THEN Name END) AS Player1name,
      MAX(CASE WHEN PlayerIndex=2 THEN PlayerID END) AS Player2ID,
      MAX(CASE WHEN PlayerIndex=2 THEN Name END) AS Player2name
  `*/

  /*
   const buildReadSql = (id) => {

    let innerSql = `SELECT 
      EventPlayers.EventID, 
      Players.PlayerID, 
      Name,
      ROW_NUMBER() OVER (PARTITION BY EventID ORDER BY EventPlayers.PlayerID) AS PlayerIndex
      FROM 
      EventPlayers LEFT JOIN Players ON EventPlayers.PlayerID=Players.PlayerID
    `;

    if(id) innerSql += ` WHERE EventPlayers.EventID =${id}`; 

    const fields = [`t.EventID, Venue, Date,
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
        LEFT JOIN Events ON t.EventID=Events.EventID
      )
      GROUP BY EventID;`;
      

      
    return sql;   
  }
  */