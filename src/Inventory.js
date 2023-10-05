import React, { Component } from 'react';
import InventoryField from './InventoryField';
import InventoryTable from './InventoryTable';
 
class Inventory extends Component {
    render() {
        return (
            <div>
                <br/><br/><br/>
                




                <InventoryField/>
                <InventoryTable/>
            </div>
        );
    }
}
 
export default Inventory;