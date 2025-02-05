export default {
  log: {
    level: 'silly',
    disabled: false,
  },
  cors: {
    origins: ['http://localhost:5173'],
    maxAge: 3 * 60 * 60,
  },
  auth: {
    jwt: {
      audience: 'robbe.template.be',
      issuer: 'robbe.template.be',
      expirationInterval: 60 * 60 * 3, // 3 uur
      secret:
        'eenveeltemoeilijksecretdatniemandooitzalradenandersisdesitegehacked',
    },
    argon: {
      hashLength: 32,
      timeCost: 6,
      memoryCost: 2 ** 17,
    },
    maxDelay : 5000, // 5 seconden
  },
  
};
