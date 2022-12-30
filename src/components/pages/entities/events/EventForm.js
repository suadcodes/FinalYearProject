import useLoad from "../../../api/useLoad.js";
import Form from "../../PageLayout/Form.js";

const emptyevents ={
    EventID:0,
    Venue:"DummyVenue",
    Player1ID:4,
    Player2ID: 3,
    Player1name: "Suad",
    Player2name:"Taiiii",
    Date:""
};

export default function EventForm({onCancel, onSubmit, initialEvent= emptyevents}){

//Initialisation
const validation = {
    isValid :{
    EventID: (id) => id !== 0,
    Venue: (name) => name.length >2,
    Player1ID: (id) => id !== 0,
    Player2ID: (id) => id !== 0,
    Player1name: (name) => name.length >2,
    Player2name: (name) => name.length >2,
},
    errorMessage :{
    EventID:"Event ID is not valid",
    Venue: "Too Short",
    Player1ID: "No Player ID has been selected",
    Player2ID: "No Player ID has been selected",
    Player1name: "Too long",
    Player2name: "Too long"

}}

const conformance = ['Player1ID','Player2ID','EventID'];
//State
const [events, errors,handleChange, handleSubmit] = Form.useForm(initialEvent, conformance, validation, onCancel, onSubmit);
const[venues, loadingVenueMessage]= useLoad('/Venue');
const[playersname, loadingPlayersMessage]= useLoad('/Players');
const[playersname2, loadingPlayersMessage2]= useLoad('/Players2');



//View
return(
     <Form onSubmit={handleSubmit} onCancel={onCancel}>
        <Form.Item
        label = "Event ID"
        htmlFor="EventID"
        advice="Please enter a unique Event ID"
        error = {errors.EventID}
        >
        <input 
        type="number"
        name="EventID"
        placeholder="Please enter event ID here"
        value={events.EventID}
        onChange={handleChange}
        />
        </Form.Item>
        <Form.Item 
        label="Venue"
        htmlFor="Venue"
        advice="Select Venue"
        error={errors.Venue}
      >
        {
          !venues
            ? <p>{loadingVenueMessage}</p>
            : venues.length === 0
              ? <p>No Venue found</p>
              : <select
                  name="Venue"
                  value={events.Venue}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    venues.map((venue) => <option key={venue.Venue} value={venue.Venue}>{venue.Venue}</option>)
                  }
                </select>
        }
      </Form.Item>
      <Form.Item 
        label="PlayerName1"
        htmlFor="Name"
        advice="Select First Player"
        error={errors.Player1name}
      >
        {
          !playersname
            ? <p>{loadingPlayersMessage}</p>
            : playersname.length === 0
              ? <p>No name found</p>
              : <select
                  name="Player1name"
                  value={events.Player1name}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    playersname.map((playersnam) => <option key={playersnam.Name} value={playersnam.Name}>{playersnam.Name}</option>)
                  }
                </select>
        }
      </Form.Item>
        <Form.Item 
        label="Playername2"
        htmlFor="Name"
        advice="Select Second Player"
        error={errors.Player2name}
      >
        {
          !playersname2
            ? <p>{loadingPlayersMessage2}</p>
            : playersname2.length === 0
              ? <p>No name found</p>
              : <select
                  name="Player2name"
                  value={events.Player2name}
                  onChange={handleChange}
                >
                  <option value="0" disabled>None selected</option>
                  {
                    playersname2.map((playersnam) => <option key={playersnam.Name} value={playersnam.Name}>{playersnam.Name}</option>)
                  }
                </select>
        }
      </Form.Item>
      
      <Form.Item
          //label="Date"
          htmlFor="Player1ID"
          advice="The Date "
          >
          <input 
          type="Date"
          name="Date"
          placeholder="Date"
          value={events.Date}
          onChange={handleChange}
          />
      </Form.Item>
    </Form>

);
}