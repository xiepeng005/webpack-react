import React from 'react';
import ReactDOM from 'react-dom';

const productTable = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            isStockOnly: false
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(name, value){
        this.setState({
            [name]: value
        })
    }
    render(){
        const filterText = this.state.filterText;
        const isStockOnly = this.state.isStockOnly;
        const products = InitTable(productTable, filterText, isStockOnly);
        console.log(products);
        return(
            <div>
                <SideBar filterText={filterText}
                         isStockOnly={isStockOnly}
                         onInputChange={this.handleChange}
                />
                <ProductTable products={products}/>
            </div>
        )
    }
}
class SideBar extends React.Component{
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(e){
        const target = e.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        this.props.onInputChange(name, value);
    }
    render(){
        return(
            <div>
                <input type="text"
                       name="filterText"
                       value={this.props.filterText}
                       onChange={this.handleInputChange}
                />
                <label>
                    <input type="checkbox"
                           name="isStockOnly"
                           checked={this.props.isStockOnly}
                           onClick={this.handleInputChange}
                    />
                    Only show products in Stock
                </label>
            </div>
        )
    }
}
function InitTable(props, filterText, isStockOnly) {
    const newTable = [];
    const CategoryRow = [];
    props.map((item) => {
        if(CategoryRow.indexOf(item.category) < 0){
            CategoryRow.push(item.category);
        }
    });
    for(let i = 0; i < CategoryRow.length ; i++){
        let category = props.filter((item) => item.category === CategoryRow[i]);
        if(isStockOnly){
            category.filter((item) => item.stocked === true)
        }
        if(filterText){
            category.filter((item) => item.name.indexOf(filterText) !== -1);
        }
        console.log(category);
        let categoryItem = {
            title: CategoryRow[i],
            content: category
        };
        newTable.push(categoryItem);
        category = [];
    }
    return newTable;
}
class ProductTable extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            products: props.products
        }
    }
    render(){
        const prods = this.state.products;
        return(
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>Price</th>
                </tr>
                </thead>
                {
                    prods.map((product) => {
                        return (
                            <ProductList key={product.title} prod={product}/>
                        )
                    })
                }
            </table>
        )
    }
}
class ProductList extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <tbody>
            <tr>
                <th colSpan="2">{this.props.prod.title}</th>
            </tr>
            {
                this.props.prod.content.map((item,index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                        </tr>
                    )
                })
            }
            </tbody>

        )
    }
}
ReactDOM.render(
    <FilterableProductTable/>,
    document.getElementById('filterable')
);