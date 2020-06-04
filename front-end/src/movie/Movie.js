import React, { Component } from "react";
import MaterialTable from "material-table";


//rank
//year
//votes
//title
//runtime
//revenue
//rating
//metascore
//genres


export default class Movie extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [],
     
        columns: [
          { title: "Title", field: "title"},
          { title: "Year", field: "year", type: "numeric" },
          { title: "Runtime", field: "runtime", type: "time" },
          { title: "Revenue(Millions)", field: "revenue", type: "currency"},
          { title: "Rating", field: "rating", type: "numeric" },
          { title: "Genres", field: "genre" },
        ]
      };
    }

    fetchData() {
        let newjson = {};

         //fetch("https://tender-mclean-00a2bd.netlify.app/web/movies.json")
         fetch("./movies.json")
         .then((r) => r.json())
          .then(data => {
            newjson =data.slice();
            newjson.map(item =>{
                return item.runtime=parseFloat((parseInt(item.runtime)/60)).toFixed(2)+" Hr"
            });
            this.setState({
              data: newjson
            });
          }, (error) => {
            console.error(error);
          });
        }

        componentDidMount() {
            this.fetchData();
          }
          render() {
              return(
                  <>
                  <MaterialTable
                            title="Movie Ratings"
                            columns={this.state.columns}
                            data={this.state.data}
                            actions={[
                            {
                                icon: "launch",
                                tooltip: "Review",
                                
                            },
                            ]}
                        />
                  </>
              );
          
        }
        
}