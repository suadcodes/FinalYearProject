import ObjectTable from '../../PageLayout/ObjectTable';
import Panel from '../../PageLayout/Panel.js';

export default function EventsPanel({events})
{
const displayableattributes=[
{key:'Venue',label: 'Venue'},
{key:'Player1name',label: 'Player 1 Name: '},
{key:'Player2name',label: 'Player 2 Name:'},

 ];
  return(
    <Panel.Container>
        {
            events.map((e) =>
             <Panel key={e.EventID} title ={`${`Event ID:`} ${e.EventID}`} level={4}>
                <Panel.Static level={4}>
                 <ObjectTable object={e} attributes={displayableattributes} />
                </Panel.Static>
              </Panel>
                 )
                        }
             </Panel.Container> 
    );
}