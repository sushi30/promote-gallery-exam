import react from 'react';
import proptypes from 'prop-types';
import axios from 'axios';
import image from '../image';
import './gallery.scss';

class gallery extends react.component {
  static proptypes = {
    tag: proptypes.string
  };

  constructor(props) {
    super(props);
    this.clonehandle = this.clonehandle.bind(this);
    this.state = {
      images      : [],
      gallerywidth: this.getgallerywidth()
    };
  }

  getgallerywidth() {
    try {
      return document.body.clientwidth;
    } catch (e) {
      return 1000;
    }
  }

  clonehandle(image) {
    this.setstate(currentstate => {
      return {
        images: currentstate.images.concat([image])
      }
    })
  }

  getimages(tag) {
    const getimagesurl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`;
    const baseurl = 'https://api.flickr.com/';
    axios({
      url    : getimagesurl,
      baseurl: baseurl,
      method : 'get'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setstate({images: res.photos.photo});
        }
      });
  }

  componentdidmount() {
    this.getimages(this.props.tag);
    this.setstate({
      gallerywidth: document.body.clientwidth
    });
  }

  componentwillreceiveprops(props) {
    this.getimages(props.tag);
  }

  render() {
    return (
      <div classname="gallery-root">
        {this.state.images.map(dto => {
          return <image key={'image-' + dto.id + (math.round(math.random() * 10000))} dto={dto} gallerywidth={this.state.gallerywidth}
                        onclone={() => {
                          this.clonehandle(dto)
                        }}/>;
        })}
      </div>
    );
  }
}

export default gallery;
