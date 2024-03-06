import { Button } from "@mui/material";

const ActionButtons = ({ onAddColumn, onRemoveColumn, onStart, onReplay }) => {
    return (
       <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', padding: '10px' }}>
         <Button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onAddColumn}>Add Column</Button>
         <Button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onRemoveColumn}>Remove Column</Button>
         <Button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onStart}>Start</Button>
         <Button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={onReplay}>Replay</Button>
       </div>
    );
   };
   
   export default ActionButtons;
   