'use strict';


angular.module('reeelApp')
  .factory('Screening', ['$rootScope', '$state', 'User', function($rootScope, $state, User) {
    
    var Screening = Parse.Object.extend('Screening');

    return {
      createScreening: function(screeningTitle, screeningDate, screeningSynopsis, screeningPoster, screeningReleaseDate, screeningContentRating, screeningDuration, screeningGenre, screeningDirectorInfo, screeningStarInfo, screeningFee){
      var screening = new Screening();
      var user = Parse.User.current();
      /**
       * Set Permission with ACL
       */
      // var acl = new Parse.ACL();
      // acl.setPublicReadAccess(true);
      // acl.setRoleWriteAccess("admins", true);

      screening.set('screeningTitle', screeningTitle);
      screening.set('screeningDate', screeningDate);
      screening.set('screeningSynopsis', screeningSynopsis);
      screening.set('screeningPoster', screeningPoster);
      screening.set('screeningReleaseDate', screeningReleaseDate);
      screening.set('screeningContentRating', screeningContentRating);
      screening.set('screeningDuration', screeningDuration);
      screening.set('screeningGenre', screeningGenre);
      screening.set('screeningDirectorInfo', screeningDirectorInfo);
      screening.set('screeningStarInfo', screeningStarInfo);
      screening.set('screeningFee', screeningFee);
      
      /**
       * add a user a value in a screening
       */
      screening.set('createdBy', user);

      screening.save(null, {
        success: function(screening) {
          $rootScope.notify = {type: 'success', message: 'Successfully Created Screening'};
          $rootScope.currentUser = user;
        },
        error: function (user, error) {
          $rootScope.notify = {type: 'error', message: 'Error: ' + error.code + ' ' + error.message};
        }
      });

      },
      getAllScreening: function(){
        var Screening = Parse.Object.extend('Screening');
        this.query = (new Parse.Query(Screening));
        
        var fetched = this.query.find({
            success: function(screenings){
              
              // console.log(screenings);
            },
            error: function(error){
              consol.log('Error: ' + error.code + ' ' + error.message);
            }
          });
        return fetched;
      },
      getScreeningWithId: function(id){
        var Screening = Parse.Object.extend('Screening');
        this.query = (new Parse.Query(Screening));
        
        var fetched = this.query.get(id);

        return fetched;
      },
      updateScreening: function(screeningId, screeningTitle, screeningDate, screeningSynopsis, screeningPoster, screeningReleaseDate, screeningContentRating, screeningDuration, screeningGenre, screeningDirectorInfo, screeningStarInfo, screeningFee){
      var user = Parse.User.current();
      // var query = new Parse.Query('Screening');

      this.getScreeningWithId(screeningId).then(
        function(screening){
           console.log('begin update');
          (typeof(screeningTitle) == 'undefined') ? console.log('not creating with screening title') : screening.set('screeningTitle', screeningTitle); 
          (typeof(screeningDate) == 'undefined') ? console.log('not creating with screening date') : screening.set('screeningDate', screeningDate);
          (typeof(screeningSynopsis) == 'undefined') ? console.log('not creating with screeningSynopsis') : screening.set('screeningSynopsis', screeningSynopsis);
          (typeof(screeningPoster) == 'undefined') ? console.log('not updating with poster') : screening.set('screeningPoster', screeningPoster); 
          (typeof(screeningReleaseDate) == 'undefined') ? console.log('not updating with release date') : screening.set('screeningReleaseDate', screeningReleaseDate);
          (typeof(screeningContentRating) == 'undefined') ? console.log('not updating with content rating') : screening.set('screeningContentRating', screeningContentRating);
          (typeof(screeningDuration) == 'undefined') ? console.log('not updating with duration') : screening.set('screeningDuration', screeningDuration); 
          (typeof(screeningGenre) == 'undefined') ? console.log('not updating with genre') : screening.set('screeningGenre', screeningGenre);
          (typeof(screeningDirectorInfo) == 'undefined') ? console.log('not updating with director info') : screening.set('screeningDirectorInfo', screeningDirectorInfo);
          (typeof(screeningStarInfo) == 'undefined') ? console.log('not updating with star info') : screening.set('screeningStarInfo', screeningStarInfo); 
          (typeof(screeningFee) == 'undefined') ? console.log('not updating with screening fee') : screening.set('screeningFee', screeningFee);

          screening.set('createdBy', user);
          screening.save();

          console.log('update ended');
        },function(error){
          console.log('Error: ' + error.code + ' ' + error.message);
        });
      },

      deleteScreening: function(screeningId){
        this.getScreeningWithId(screeningId).then(function(screening){
            screening.destroy(null, {
            success: function(screening){
            },
            error: function(screening, error){
            }
            });
          },function(error){
            console.log('Error: ' + error.code + ' ' + error.message);
        });
      }
    };

  }]);
