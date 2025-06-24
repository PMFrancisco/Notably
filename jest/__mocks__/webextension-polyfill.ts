const browser = {
  runtime: {
    sendMessage: jest.fn().mockResolvedValue({}),
    onMessage: {
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  },
  storage: {
    sync: {
      get: jest.fn().mockResolvedValue({}),
      set: jest.fn().mockResolvedValue(undefined),
      remove: jest.fn().mockResolvedValue(undefined)
    },
    local: {
      get: jest.fn().mockResolvedValue({}),
      set: jest.fn().mockResolvedValue(undefined),
      remove: jest.fn().mockResolvedValue(undefined)
    }
  },
  tabs: {
    query: jest.fn().mockResolvedValue([
      {
        id: 1,
        url: 'https://example.com',
        title: 'Example Site',
        active: true
      }
    ]),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({})
  }
};

export default browser;
