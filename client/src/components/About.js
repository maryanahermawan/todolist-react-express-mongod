import React from "react";
export class About extends React.Component {
    state = {
        imageSrc:"",
    }
    //the file as binary data
    async componentDidMount () {
        const response = await fetch("https://avatars2.githubusercontent.com/u/22461722?s=400&u=404c9d39b94f9a3c69af974eff7db43b932c39ad&v=4");
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
                <img src={this.state.imageSrc} alt="Google the golden retriever..."/>
                <p>Hello! My name is Maryana. I live in Bishan and work in electronics chip company as mixed-signal engineer.
                    I studied Electrical Engineering in NUS. In my free time, I join a cause for the homeless in Singapore.
                    I am also one of the catechists for the teenagers in my Church.
                    In my office, I offer service to my department of 45 people to rinse our plastic containers & dispose them in the recycling bin because I care for our Mother Earth.
                    I know I can and I want to do more in caring for our environment while having so much fun coding together with TechLadies in the Bootcamp! 
                    When commuting, I enjoy looking at pictures and watching videos of golden retrievers, samoyeds and all kinds of bears!
                    I hope one day I can adopt a dog.
                </p>
            </div>
        )
    }
}