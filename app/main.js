import React from 'react';
import ReactDOM from 'react-dom';

function formatName(user) {
    return user.firstName + ' ' + user.lastName;
}
const user = {
    firstName: "Bob",
    lastName: "Simelon"
};
const element = (
    <h1>
        Hello, {formatName(user)}!
    </h1>
);
class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            time: new Date().toLocaleTimeString()
        };
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1,
            time: new Date().toLocaleTimeString()
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <h2>欢迎来到我的主页</h2>
                <h3>现在的时间是：{this.state.time}</h3>
                Seconds: {this.state.seconds}
            </div>
        );
    }
}

function WarningBanner(props) {
    if(!props.warn){
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    )
}

class Page extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showWarning: false
        };
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    handleToggleClick(){
        this.setState((prevState) => ({
            showWarning: !prevState.showWarning
        }))
    }
    render(){
        return (
            <div>
                <WarningBanner warn = {this.state.showWarning}/>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? "Hide" : "Show"}
                </button>
            </div>
        )
    }
}
const number = [1, 2, 3, 4, 5];
const listItem = number.map((item, index) =>
    <li key={index}>{item}</li>
);

function Blog(props) {
    const sidebar = (
        <ul>
            {
                props.posts.map((post) =>
                    <li key={post.id}>
                        {post.title}
                    </li>
                )
            }
        </ul>
    );
    const content = props.posts.map((post) =>
        <div key={post.id}>
            <h3>{post.title}</h3>
            <h3>{post.content}</h3>
        </div>
    );
    return (
        <div>
            {sidebar}
            <hr/>
            {content}
        </div>
    )
}
const posts = [
    {id:1, title:'Hello World', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

class Reservation extends React.Component{
    constructor(props){
        super();
        this.state={
            isGoing: true,
            numberOfGuests: 2
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    render(){
        return(
            <form>
                <label>
                    Is Going:
                    <input type="checkbox"
                           name="isGoing"
                           checked={this.state.isGoing}
                           onChange={this.handleInputChange}
                    />
                </label>
                <br/>
                <label>
                    Number of Guests:
                    <input type="text"
                           name="numberOfGuests"
                           value={this.state.numberOfGuests}
                           onChange={this.handleInputChange}
                    />
                </label>
            </form>
        )
    }
}
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}
function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水会烧开</p>;
    }
    return <p>水不会烧开</p>;
}
const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        this.props.onTemperatureChange(e.target.value);
    }
    render() {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>在{scaleNames[scale]}:中输入温度数值</legend>
                <input value={temperature}
                       onChange={this.handleChange} />
            </fieldset>
        );
    }
}
class Calculator extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            temperature: '',
            scale: 'c'
        };
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    }
    handleCelsiusChange(temperature){
        this.setState({
            temperature: temperature,
            scale: 'c'
        })
    }
    handleFahrenheitChange(temperature){
        this.setState({
            temperature: temperature,
            scale: 'f'
        })
    }
    render(){
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
        const fahrenheit = scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

        return(
            <div>
                <TemperatureInput scale="c"
                                  temperature={celsius}
                                  onTemperatureChange={this.handleCelsiusChange}
                />
                <TemperatureInput scale="f"
                                  temperature={fahrenheit}
                                  onTemperatureChange={this.handleFahrenheitChange}
                />
                <BoilingVerdict
                    celsius={parseFloat(celsius)} />
            </div>
        )
    }
}

ReactDOM.render(
    <div>
        <Timer />
        <br/><hr/><br/>
        {element}
        <br/><hr/><br/>
        <Page/>
        <br/><hr/><br/>
        <ul>
            {listItem}
        </ul>
        <br/><hr/><br/>
        <Blog posts={posts}/>
        <br/><hr/><br/>
        <Reservation/>
        <br/><hr/><br/>
        <Calculator/>
    </div>,
    document.getElementById('hello')
);