import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from "draft-js";
import { Modal, ModalHeader, ModalBody,  Card, CardImg, CardText, CardBody,Button, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import draftToHtml from "draftjs-to-html";
import axios from "axios";
import "../../css/writenews.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../../css/commentForm.css';
import '../../css/newsdetail.css';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'
import RenderNavbar from "../UI/NavBarComponent";

export default class TextEditor extends Component {


  state = {
    editorState: EditorState.createEmpty(),
    title: "",
    subheader: "",
    headerImage : "../assets/images/news1.jpg",
    thumbnail : "../assets/images/news0.jpg",
    tag: "",
    category: "",
    reporterID: "",
    isModalOpen : false,
    headerPic:'',
    authorImage: '',
    authorName:'',
    authorDesk:'', 
    auhtorRole:"", 
    body:'',
    id:'',
    uploadedImages: [],
  };




  changeHeaderPic=(event)=>{
    console.log(event.target.files);
    this.setState({
      headerPic:event.target.files[0]
    })
    console.log(this.state.headerPic);
  }


  onSubmit=(event)=>{
    event.preventDefault();

    const formData= new FormData();

    formData.append("headerPic",this.state.headerPic)

    axios.post(`http://localhost:3000/writenews/tempUpload`,formData)
    
    .then( (res)=>{
    //console.log(res)
     } 
    ).catch(error=>{
      console.log(error)
    })


  }

  uploadImageCallBack = (file) => {
    // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.
    
        // Make sure you have a uploadImages: [] as your default state
        let uploadedImages = this.state.uploadedImages;
    
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
    
        uploadedImages.push(imageObject);
    
        this.setState({ uploadedImages: uploadedImages }, () => {
          console.log("UploadedImages", uploadedImages[0]);
        })    
    
        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
        
  }




  toggleModal = (e) => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  componentDidMount(){ 
    console.log("request send");
    axios.get("http://localhost:3000/dashboard",{
      headers : {
        "auth-token": localStorage.getItem("token")
      }
    })
    .then( (res)=>{
      this.setState({
        reporterID:res.data.id,
        authorImage:res.data.profilePic,
        authorName:res.data.fullName + " " + res.data.lastName,
        authorDesk:res.data.userDesk,
        authorRole:res.data.userRole
      })
        console.log(res.data.userRole)
        
    }).catch(()=>{
      window.location = "/signin"
    })

    console.log(this.props);
    if(this.props.location.state !== undefined)
      {
        this.setState({
          title : this.props.location.state.n_title,
          category : this.props.location.state.n_category,
          subheader : this.props.location.state.n_subheader,
          tag : "",
          body : this.props.location.state.n_body,
          id : this.props.location.state.n_id,
          editorState: EditorState.createWithContent(
            ContentState.createFromBlockArray(
              convertFromHTML(this.props.location.state.n_body)
            )
          ),
        },()=>{
          console.log(this.state);
        })

      }     
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    },()=>{
      console.log("EditorState",editorState);
    });
  };

  submitNews = (e) => {
    const { editorState } = this.state;
      console.log("Database input is-");
      console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));


      const formData= new FormData();

      console.log(this.state.authorRole);
      formData.append("headerPic",this.state.headerPic)
      formData.append("title",this.state.title)
      formData.append("subheader",this.state.subheader)
      formData.append("body",draftToHtml(convertToRaw(editorState.getCurrentContent())))
      if(this.state.authorRole === "editor" || this.state.auhtorRole === "sub-editor"){
        formData.append("category","opinion")
      }
      else{
        formData.append("category",this.state.authorDesk)
      }
      
      formData.append("tag","")
      formData.append("date",new Date().toISOString)
      formData.append("reporterID",this.state.reporterID)
      formData.append("headerImage",this.state.headerImage)
      formData.append("thumbnail",this.state.thumbnail)

    console.log(formData)

      if(this.props.location.state !== undefined)
      {
        const nw = {
          title : this.state.title,
          body : draftToHtml(convertToRaw(editorState.getCurrentContent())),
          intempNews : this.props.location.intempNews,
          subheader : this.state.subheader,
          tag : "",
          reporterID : this.state.reporterID,
          category: this.state.authorDesk
        }
        console.log("NW",nw);
        axios.put(`http://localhost:3000/writenews/edit/${this.state.id}`, nw)
        .then((res) => {
            console.log("After PUT");
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
      }
      else
      {
        console.log(formData);
        axios.post("http://localhost:3000/writenews", formData)
        .then((res) => {
            console.log("After POST");
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
      }
    }


    myChangeHandler = (event) => {
      let fn = event.target.name;
      let fv = event.target.value;

      console.log("Testing");
      console.log(fn,":",fv);
      
      
      this.setState({
        [fn]: fv,
      });
    }

    confirmDialog = (e) => {
      confirmAlert({
        
        message: 'Are you sure you want to submit?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => this.submitNews()
          },
          {
            label: 'No',
            onClick: () => null
          }
        ]
      })
    }

  render() {
    //console.log(this.state);
    const { editorState } = this.state;
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));

    const news = {
      title : this.state.title,
      headerPic : this.state.headerPic,
      subheader : this.state.subheader,
      body : draftToHtml(convertToRaw(editorState.getCurrentContent())),
      category :this.state.category,
      tag: "",
      date : new Date().toISOString,
      reporterID : this.state.reporterID,
      reportername: this.state.authorName,
  }

  console.log("News---");
  console.log(news);

  console.log("HeaderPic log---");
  console.log(news.headerPic);

  console.log("AuthorImage log---");
  console.log(this.state.authorImage);

  console.log("Authorname log---");
  console.log(this.state.authorName);
    return (
      <div>
        <RenderNavbar/>
      
      <div className="row">
           <div className="col-md-4">
              <form id="headers">

              <div className="form-group" >
               
                  <input  type="file" placeholder="Upload Image"
                  fileName="headerPic"
                  onChange={this.changeHeaderPic}
                  
                  className="form-control-file"
                  />
                  <Button className="btn-lg btn-success submitButton"
                        onClick = {this.onSubmit} > Set </Button>


              </div>


                <h3 className="col-md-12">Title</h3>
                <textarea className="col-md-12 textfont" rows="5" name="title" onChange={this.myChangeHandler} defaultValue={news.title}></textarea>

                <h3 className="col-md-12">Sub-Header</h3>
                <textarea className="col-md-12 textfont" rows="3" name="subheader" onChange={this.myChangeHandler} defaultValue={news.subheader}></textarea>

                {/* <h3 className="col-md-12" >Tag</h3>
                <textarea className="col-md-12 textfont" name="tag" onChange={this.myChangeHandler} defaultValue={news.tag}></textarea> */}

                <Button className=" col-md-12 btn-lg btn-warning submitButton"
                        onClick = {this.toggleModal} > Preview </Button>

                <Button className=" col-md-12 btn-lg btn-success submitButton"
                        onClick = {this.confirmDialog} > Submit </Button>
              </form>

              <Modal size="xl" className="modalwidth" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Preview</ModalHeader>
                    <ModalBody>
                    <div>
                      <Card>
                          <h3>{news.title}</h3>
                          <CardImg className="heading" style={{height:"700px", width: "1100px", alignSelf:'center'}} top  src={process.env.PUBLIC_URL + '/assets/tempNews/'+ news.headerPic.name} alt={news.title} />
                          <CardBody>
                            {/*<CardTitle>{news.name}</CardTitle>*/}
                            <CardText className="wordwrap">
                                <div>
                                    <span>
                                      <img align="left" className="authorImage" src={process.env.PUBLIC_URL + '/assets/uploads/'+ this.state.authorImage} alt="AuthorImage"/>
                                    </span>
                                  
                                  <div className="authorInfo">
                                      {this.state.authorName}<br/>
                                      {news.date}
                                  </div>
                                  
                                </div>

                                <br/>
                                <div className="wordwrap"
                                      dangerouslySetInnerHTML={{ __html: news.body }}>
                                </div>
                              </CardText>
                          </CardBody>
                      </Card>
                    </div>
                    </ModalBody>
               </Modal>


           </div>
           <div className="newsEditor col-md-8">
                <Editor
                editorState={this.state.editorState}
                toolbarClassName="toolbarClassName rdw-storybook-toolbar"
                wrapperClassName="wrapperClassName rdw-storybook-wrapper"
                editorClassName="editorClassName rdw-storybook-editor"
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: { uploadCallback: this.uploadImageCallBack },
                  inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                }}
                onEditorStateChange={this.onEditorStateChange}
                />
           </div>

            <div className="col-md-2">
                
            </div>
      </div>
      </div>
    );
  }
}