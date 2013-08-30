describe("Cookie", function() {
  var cookie;

  describe("new cookie", function() {
    beforeEach(function() {
      cookie = new Cookie('chocolate',10, 0, "raw");
    });
    it("should be type chocolate", function() {
      expect(cookie.type).toEqual('chocolate');
    });
    it("should have bakeTime of 10", function() {
      expect(cookie.bakeTime).toBe(10);
    });
    it("should have timeBaked of 0", function() {
      expect(cookie.timeBaked).toBe(0);
    });
    it("should have status of 'raw'", function() {
      expect(cookie.status).toBe('raw');
    });
  });

  describe("cookie baking", function() {
    beforeEach(function() {
      cookie = new Cookie('chocolate',10, 0, "raw");
    });
    
    it("should have a status of 'still_gooey' before baked 10 times", function() {
      cookie.bake();
      expect(cookie.status).toBe('still_gooey');
    });

    it("should have a status of 'just_right' after baked 10 times", function() {
      for (i = 0; i<10; i++) {
        cookie.bake();
      }
      expect(cookie.status).toBe('just_right');
    });
    
  });
    

  // describe("when song has been paused", function() {
  //   beforeEach(function() {
  //     player.play(song);
  //     player.pause();
  //   });

  //   it("should indicate that the song is currently paused", function() {
  //     expect(player.isPlaying).toBeFalsy();

  //     // demonstrates use of 'not' with a custom matcher
  //     expect(player).not.toBePlaying(song);
  //   });

  //   it("should be possible to resume", function() {
  //     player.resume();
  //     expect(player.isPlaying).toBeTruthy();
  //     expect(player.currentlyPlayingSong).toEqual(song);
  //   });
  // });

  // // demonstrates use of spies to intercept and test method calls
  // it("tells the current song if the user has made it a favorite", function() {
  //   spyOn(song, 'persistFavoriteStatus');

  //   player.play(song);
  //   player.makeFavorite();

  //   expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  // });

  // //demonstrates use of expected exceptions
  // describe("#resume", function() {
  //   it("should throw an exception if song is already playing", function() {
  //     player.play(song);

  //     expect(function() {
  //       player.resume();
  //     }).toThrow("song is already playing");
  //   });
  // });
});