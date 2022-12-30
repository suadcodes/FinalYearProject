const [errors, setErrors] = useState(
    Object.keys(initialEvent).reduce((accum,key) => ({...accum,[key]:null}), {})
);

const errorMessage ={
    EventID:"Event ID is not valid",
    Venue: "Too Short",
    Player1ID: "No Player ID has been selected",
    Player2ID: "No Player ID has been selected",
    Player1name: "Too long",
    Player2name: "Too long"

}
const isValid ={
    EventID:(id) => id!==0,
    Venue:(name)=> name.length > 9,
    Player1ID: (id) =>true,
    Player2ID: (id) =>true,
    Player1name: (name)=> name.length >9,
    Player2name:(name)=> name.length > 9
}
//Handlers 
const handleChange =(event)=>{
    const {name,value} =event.target;
    const newValue =(name === 'Player1name') || (name === 'Player2name') || (name === 'Venue') 
    setEvents({...event,[name]: newValue});
    setErrors({...errors,[name]: isValid[name](newValue) ? null:errorMessage[name]});

};
<>
<Form.Item
        label="Player 2 name"
        htmlFor="Player2name"
        advice="Please enter the player's name "
        error = {errors.Player2name}

        >
        <input 
        type="text"
        name="Player2name"
        placeholder="Player2name"
        value={events.Player2name}
        onChange={handleChange}

        />
        </Form.Item>  

<Form.Item
label="Player 1 ID"
htmlFor="Player1ID"
advice="Please enter the ID "
error = {errors.Player1ID}

>
<input 
type="text"
name="Player1ID"
placeholder="Player1ID"
value={events.Player1ID}
onChange={handleChange}
/>
</Form.Item>

<Form.Item
label="Player 2 ID"
htmlFor="Player2ID"
advice="Please enter the ID "
error = {errors.Player2ID}

>
<input 
type="text"
name="Player2ID"
placeholder="Player2ID"
value={events.Player2ID}
onChange={handleChange}
/>
</Form.Item>      
</>