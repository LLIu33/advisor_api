const admin = require('../../utils/firebase').getAdmin();
const profileModel = require('../services/profile');
const { httpCodes } = require('../../utils/http');

//TODO: remove temporary solution for testing
const hardcodedToken =
  'eyJhbGciOiJSUzI1NiIsImtpZCI6ImRjMGMzNWZlYjBjODIzYjQyNzdkZDBhYjIwNDQzMDY5ZGYzMGZkZWEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZm9iZS1pZCIsImF1ZCI6ImZvYmUtaWQiLCJhdXRoX3RpbWUiOjE1ODYzNDk5MDcsInVzZXJfaWQiOiJ4TXYyQjJmMmJRTUE1NWtwTERaRXhHTFF4ZDMzIiwic3ViIjoieE12MkIyZjJiUU1BNTVrcExEWkV4R0xReGQzMyIsImlhdCI6MTU4NjQ0MTgxOSwiZXhwIjoxNTg2NDQ1NDE5LCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEB0ZXN0LmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.u-_Q_BBHk4Y4U88O9zKAKPG9AcwfHlX0-3rpaufe3BhVskopqJ_DDUvqBKwo91TZuNtXYfFYouCCGe4IsK982aSDAA-jEFo-zI-QZwbnyebC4YfdrG5lLfu37Tstldo2_ChqIsXW9lWis1tKrU_BfSLQiu45gUNxEVdexuBbP8FBF6aDL3a5VblmwLtpa7vdlp_oDq92tCumvAKgU3UbI9VBFs-DkTdfKk6oRbGzvhIuRpJ68ESq-asc6-cyfEBvfTKQkfFlh4X0DGoDcr12cDrlvUUWMHc_WCjk-V09WWssal0_iqm-5qNlDnQjWBI6muE8hTikDFEXwRC7mFOI7g';
const hardcodedProfileId = 'xMv2B2f2bQMA55kpLDZExGLQxd33';

const requiresLogin = async (req, res, next) => {
  console.log('requiresLogin middlware');
  try {
    const authToken = getAuthToken(req.headers);
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const { uid } = decodedToken;
    const profile = await profileModel.getById(uid);
    if (!profile) {
      throw new Error('Profile not found');
    }
    req.currentProfile = profile;
    next();
  } catch (error) {
    if (getAuthToken(req.headers) === hardcodedToken) {
      const profile = await profileModel.getById(hardcodedProfileId);
      req.currentProfile = profile;
      return next();
    }
    console.log(error);
    return res.status(httpCodes.UNAUTHORIZED).send('UNAUTHORIZED');
  }
};

const getAuthToken = (headers) => {
  if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    const [, token] = headers.authorization.split(' ');
    return token;
  }
  return null;
};

module.exports = {
  requiresLogin,
};
