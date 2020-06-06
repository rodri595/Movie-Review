import React, { Component} from "react";
import MaterialTable from "material-table";
import firebase from '../common/Firebase';

//Material Ui
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

//react boostrap
import { Spinner } from 'reactstrap';



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
      this.ref = firebase.firestore().collection('movieList');
      this.unsubscribe = null;
      this.state = {
        movieList: [],
        movieComments: [],
        data: [],
        columns: [
          { title: "Title", field: "title"},
          { title: "Year", field: "year", type: "numeric" },
          { title: "Runtime", field: "runtime", type: "time" },
          { title: "Revenue(Millions)", field: "revenue", type: "currency"},
          { title: "Rating", field: "rating", type: "numeric" },
          { title: "Genres", field: "genre" },
        ],
        open:false,
        movieinfo:{},
        spinner:false,
      };
    }

    fireBaseData = ()=>{
      firebase.firestore().collection("movieList").onSnapshot (querySnapshot=>{
        let List =[]
        querySnapshot.forEach(doc => {
          List.push({id:doc.id, ...doc.data() })
        })
        this.setState({
          movieList: List
        })
        
      })
    }
    fireBaseDataComments = (id)=>{
      firebase.firestore().collection("movieList").doc(id).collection("comments").onSnapshot (querySnapshot=>{
        let comments =[]
        querySnapshot.forEach(doc => {
          comments.push({id:doc.id, ...doc.data() })
        })
        this.setState({
          movieComments: comments,
          spinner:false
        })
        
      })
    }

    handleClickOpen = async (event, rowData) => {
    this.setState({
      spinner:true,
      open: !this.state.open,
      movieinfo:rowData}); 
      this.state.movieList.filter(item=>{
        if(item.title === rowData.title)
        {
          this.fireBaseDataComments(item.id)
        }
      });
      
  };

     handleClose = async () => {
    this.setState({open: !this.state.open})

    };

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

          componentWillMount(){
            this.fireBaseData();  
                 
          }
          render() {
            const {movieComments} = this.state;
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
                                onClick: (event, rowData) =>{
                                  this.handleClickOpen(event, rowData);
                                }
                                
                            },
                            ]}
                        />
                        <Dialog
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="alert-dialog-slide-title"
                          aria-describedby="alert-dialog-slide-description"
                        >
                        <DialogTitle id="alert-dialog-slide-title">
                        <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
                          <ArrowBackIcon />
                        </IconButton>{this.state.movieinfo.title+" Comments"}</DialogTitle>
                        <DialogContent>
                          {this.state.spinner ? <Spinner color="success"/>:
                          <DialogContentText id="alert-dialog-slide-description">
                            {movieComments.map(item=>
                              {return <li>{item.comment}</li>}
                            )}
                          </DialogContentText>
                          }
                        </DialogContent>
                        <DialogActions>
                        <IconButton edge="end" color="inherit" onClick={this.handleClose} aria-label="close">
                          <PlayCircleFilledIcon />
                        </IconButton>
                        </DialogActions>
                      </Dialog>
                  </>
              );
          
        }
        
}
