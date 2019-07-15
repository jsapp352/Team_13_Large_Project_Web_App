import React from "react"


 class WaitList extends React.Component {
    constructor(){
        super()
        this.state = {
           names: ["name1","name2","name3"]
        }
    }

    render()
    {
        
        return(
            <div>
                {this.state.names.map( (data, index) => (
                        <div>
                            {data}
                        </div>

                  )  )}
            </div>
        )
    }
}


export default WaitList;