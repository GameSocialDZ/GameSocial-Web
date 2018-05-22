class NewUserObject {
  constructor(user, dob = '', username) {
    this.id = user.uid;
    this.profile = {
      id: user.uid,
      username: username,
      email: user.email,
      name: "",
      avatar: "https://res.cloudinary.com/diygdnbei/image/upload/v1519444005/zumnvvbqi0fo1zthkal7.png",
      bio: "",
      guild: "",
      dob: dob
    };
    this.timestamp = new Date().getTime().toString();
    this.lastLogin = [];
    this.points = 0;
    this.likes = {
      videos: [],
      comments: []
    };
    this.comments = [];
    this.isAdmin = false; //SR Added 12/13 - default admin status false
    this.notifications = [];
    this.videos = [];
    this.images = [];
    this.following =[];
    this.followers =[];
    this.guild = "";
  }
}

class VideoObject{
  constructor(video){
    this.id = video.id;
    this.url = video.url;
    this.audio = (video.audio)?video.audio: null;
    this.content = video.content;
    this.publisher = video.publisher;
    this.name = video.name;
    this.config = video.config;
    // this.thumbnail = video.thumbnail;
    this.points = video.points;
    this.status = video.status;
    this.options = video.options;
    this.featured = (video.status.featured)?video.status.featured:[]; // Might not need an array for this one. The "Featured Video" section in the DB should contain an array of IDs and possibly the date/time stamp when they were set.
    this.comments = (video.comments)?video.comments:[]
  }
}

class ImageObject{
  constructor(image){
    this.id = image.id;
    this.url = image.url;
    this.content = image.content;
    this.publisher = image.publisher;
    this.name = image.name;
    this.config = image.config;
    // this.thumbnail = image.thumbnail;
    this.points = image.points;
    this.status = image.status;
    this.options = image.options;
    this.featured = (image.status.featured)?image.status.featured:[]; // Might not need an array for this one. The "Featured Video" section in the DB should contain an array of IDs and possibly the date/time stamp when they were set.
    this.comments = (image.comments)?image.comments:[]
  }
}

// class UserObject {
//   constructor(isAuth, user) {
//     this.isAuth = isAuth;
//     this.isAdmin = user.isAdmin;
//     this.profile = user.profile;
//     this.likes = user.likes;
//     this.dislikes = user.dislikes;
//     this.favorite = user.favorite;
//     this.followers = user.followers;
//     this.following = user.following;
//     this.points = user.points;
//     this.teams = user.teams;
//     this.comments = user.comments;
//   }
// }
//
// class UpdateUserProfileObject{
//   constructor(user, profile, avatarUrl){
//     this.avatar = avatarUrl;
//     this.bio = profile.bio;
//     this.id = user.id;
//     this.name = profile.fullName;
//     this.userName = user.userName;
//     this.guild = profile.guild;
//   }
// }
//
// class LoginModel {
//   constructor(isOpen, isLoading,showMsg,accountSubmitted, message) {
//     this.openModal = isOpen;
//     this.isLoading = isLoading;
//     this.showMsg = showMsg;
//     this.accountSubmitted = accountSubmitted;
//     this.message = message;
//   }
// }
//
//
// class CommentsObject{
//   constructor(video, user, comment){
//     this.profile = user.profile;
//     this.videoId = video.id;
//     this.flags = [];
//     this.comment = comment;
//     this.enabled = true;
//     this.timestamp = new Date().getTime().toString();
//   }
// }

module.exports = {NewUserObject, VideoObject, ImageObject};