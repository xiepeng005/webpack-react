import React from "react";
import ReactDOM from "react-dom";

const IMAGE_DATA = [
    {
        src:'/images/banner1.jpg',
        title:'图片1'
    },
    {
        src:'/images/banner2.jpg',
        title:'图片2'
    },
    {
        src:'/images/banner3.jpg',
        title:'图片3'
    },
    {
        src:'/images/banner4.jpg',
        title:'图片4'
    }
];

/**
 * SlideItem
 */
class SlideItem extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {count, item} = this.props;
        return(
            <li className="slider-item" style={{"width":this.props.width + 'px', "float": "left"}}>
                <img src={item.src} alt={item.title} title={item.title}/>
            </li>
        )
    }
}

/**
 * SlideDots
 */
class SlideDots extends React.Component{
    constructor(props){
        super(props);
    }

    handleDotClick(i){
        let option = i - this.props.nowLocal;
        this.props.turn(option);
    }
    render(){
        let dotNodes = [];
        let {count, nowLocal} = this.props;
        for(let i= 0; i < count; i++){
            dotNodes[i] = (
                <span key={'dot' + i}
                      className={"slider-dot " + (i === nowLocal ? "slider-dot-selected":"" )}
                      onClick={this.handleDotClick.bind(this, i)}
                >
                </span>
            )
        }
        return(
            <div className="slider-dots-wrap">
                {dotNodes}
            </div>
        )
    }
}

/**
 * SlideArrow
 */
class SlideArrows extends React.Component{
    constructor(props){
        super(props);
    }

    handleArrowClick(option){
        this.props.turn(option)
    }

    render(){
        return(
            <div className="slider-arrows-wrap">
                <span className="slider-arrow slider-arrow-left"
                      onClick={this.handleArrowClick.bind(this,-1)}
                >
                </span>
                <span className="slider-arrow slider-arrow-right"
                      onClick={this.handleArrowClick.bind(this,1)}
                >
                </span>
            </div>
        )
    }
}

/**
 * Slide
 */
class Slide extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            nowLocal: 0,
            slideWidth: '',
            left: 0
        };
        this.turn = this.turn.bind(this);
        this.goPlay = this.goPlay.bind(this);
        this.pausePlay = this.pausePlay.bind(this);
    }

    //向前向后
    turn(n){
        let _n = this.state.nowLocal + n;
        let total = this.props.items.length;
        let s_width = this.state.slideWidth;
        let min = 0;
        let max = (total + 1) * s_width;
        let step = Number(n * s_width / (this.props.speed * 5));
        let to = (_n + 1) * s_width;
        if(_n < 0){
            _n = _n + total
        }
        if(_n >= total){
            _n = _n - total
        }
        this.setState({
            nowLocal: _n
        });
        this._animate = setInterval(() => {
            this.setState((prevState) => {
                let temp_left = prevState.left + step;
                if(step > 0){
                    if(temp_left >= to){
                        clearInterval(this._animate);
                        if(temp_left >= max){
                            temp_left = s_width;
                        }
                        return {
                            left: temp_left
                        }
                    } else {
                        return {
                            left: temp_left
                        }
                    }
                } else{
                    if(temp_left <= to){
                        clearInterval(this._animate);
                        if(temp_left <= min){
                            temp_left = total * s_width;
                        }
                        return {
                            left: temp_left
                        }
                    } else {
                        return {
                            left: temp_left
                        }
                    }
                }
            })
        }, 100);
    }

    //自动轮播
    goPlay(){
        if(this.props.autoPlay){
            this.autoPlayFlag = setInterval(() => {
                this.turn(1);
            }, this.props.delay * 1000);
        }
    }

    //暂停自动轮播
    pausePlay(){
        clearInterval(this.autoPlayFlag);
    }

    componentDidMount(){
        console.log(this._tag.clientWidth);
        this.setState({
            slideWidth: this._tag.clientWidth,
            left: this._tag.clientWidth
        });
        this.goPlay();
    }

    render(){
        let count = this.props.items.length;
        let effect = this.props.effect;
        let CloneLeft = '';
        let CloneRight = '';
        /*let itemNodes = this.props.items.map((item, index) => {
            if(index === 0){
                CloneRight = <SlideItem item={item} count={count} key={"itemClone" + index} width={this.state.slideWidth}/>;
            } else if(index === count -1 ){
                CloneLeft = <SlideItem item={item} count={count} key={"itemClone" + index} width={this.state.slideWidth}/>
            }
            return <SlideItem item={item} count={count} key={"item" + index} width={this.state.slideWidth}/> ;
        });*/
        let itemNodes = [];
        this.props.items.forEach((item, index) => {
            if(index === 0){
                CloneRight = <SlideItem item={item} count={count} key={"itemClone" + index} width={this.state.slideWidth}/>;
            } else if(index === count -1 ){
                CloneLeft = <SlideItem item={item} count={count} key={"itemClone" + index} width={this.state.slideWidth}/>
            }
            itemNodes.push(<SlideItem item={item} count={count} key={"item" + index} width={this.state.slideWidth}/>) ;
        });
        let arrowNode = <SlideArrows turn={this.turn}/>;
        let dotNode = <SlideDots turn={this.turn} count={count} nowLocal={this.state.nowLocal}/>;
        let style = {
            left: -this.state.left + "px",
            width: this.state.slideWidth * count + "px"
        };
        if(effect === "leftLoop"){
            itemNodes.unshift(CloneLeft);
            itemNodes.push(CloneRight);
            style.width =  this.state.slideWidth * (count + 2) + "px";
        }
        return (
            <div className="slider"
                 onMouseOver={this.props.pause ? this.pausePlay : null}
                 onMouseOut={this.props.pause ? this.goPlay : null}
                 ref={(el) => {this._tag = el}}
            >
                <ul style={style}>
                    {itemNodes}
                </ul>
                {this.props.arrow ? arrowNode : null}
                {this.props.dots ? dotNode : null}
            </div>
        )
    }
}
ReactDOM.render(
    <Slide
        items={IMAGE_DATA}
        speed={1}
        delay={5}
        pause={true}
        autoPlay={true}
        dots={true}
        arrow={true}
        effect={"leftLoop"}
    />,
    document.getElementById('Slide')
);