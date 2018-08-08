import React from "react";
export class About extends React.Component {
    state = {
        imageSrc:"",
    }
    //the file as binary data
    async componentDidMount () {
        //const response = await fetch("https://avatars2.githubusercontent.com/u/22461722?s=460&v=4");
        const response = await fetch("https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260");
        const imageBlob=await response.blob();
        const imageSrc=window.URL.createObjectURL(imageBlob);
        this.setState({
            imageSrc: imageSrc,
        })
    }

    render (){
        if(!this.state.imageSrc) {
            return <p>Loading...</p>
        }
        return (
            <div>
              
                <img src={this.state.imageSrc} alt="Cat"/>

            </div>
        )
    }
}