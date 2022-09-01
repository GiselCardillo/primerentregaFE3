import { Component } from 'react';
import { Story } from './Story';

class StoryList extends Component {

    constructor(props) {

        super(props);
        this.state = {
            stories: [],
            opcionUno: "",
            opcionDos: "",
            storyCounter: 0,
            classNameStories: [],
            opcionAnterior: '',
            opcionesAnteriores: ''
        }

        this.handleOpcion = this.handleOpcion.bind(this)
    }

    componentDidMount() {

        const url = `./data.json`

        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(data => data.json())
            .then(res => {
               
                const classNameStories = [];
                res.historias.forEach(() => {
                    classNameStories.push('inactive');
                });
                classNameStories[0] = 'active';

                this.setState({
                    stories: res.historias,
                    opcionUno: res.historias[0].opcionUno,
                    opcionDos: res.historias[0].opcionDos,
                    classNameStories
                })
            })
            .catch(error => console.log(error));
    }

    handleOpcion(opcionElegida) {

        const counter = this.state.storyCounter + 1;

        if(counter >= this.state.stories.length) {
            return;
        }

        const classNameStories = this.state.classNameStories.map((classNameStory, index) => {
            if (index === counter) {
                classNameStory = 'active';
            }
            return classNameStory;
        });

        this.setState({
            storyCounter: counter,
            opcionAnterior: opcionElegida,
            opcionesAnteriores: counter === 1 ? opcionElegida : this.state.opcionesAnteriores + ' || ' + opcionElegida,
            classNameStories,
            opcionUno: this.state.stories[counter].opcionUno,
            opcionDos: this.state.stories[counter].opcionDos
        });
    }

    render() {
        return (
            <div>
                <div>
                    {
                        this.state.stories.map((story, index) => {
                            return <Story key={story.id} cssClass={this.state.classNameStories[index]} historia={story.historia} />
                        })
                    }
                </div>
                <div className='buttonContainer'>
                    <button className='button blueButton' type="button" onClick={() => this.handleOpcion(this.state.opcionUno)}>{this.state.opcionUno}</button>
                    <button className='button pinkButton' type="button" onClick={() => this.handleOpcion(this.state.opcionDos)}>{this.state.opcionDos}</button>
                </div>
                <div><span className='tituloSeleccion'>Ultima Seleccion:</span> <span className='greenText'>{this.state.opcionAnterior}</span></div>
                <div><span className='tituloSeleccion'>Selecciones anteriores:</span> <span className='redText'>{this.state.opcionesAnteriores}</span></div>
            </div>
        );
    }
}

export default StoryList;