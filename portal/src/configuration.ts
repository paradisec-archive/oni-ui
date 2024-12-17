import configurationJSON from '@/../configuration.json';
import { z } from 'zod';

// const helpSchema = z.object({
//   aboutText: z.string(),
//   helpUrl: z.string().url(),
//   citationText: z.string(),
// });

const subHelpLinkSchema = z.object({
  name: z.string(),
  href: z.string().url(),
  target: z.string(),
});

const googleFormSchema = z.object({
  takedown: z.string().url(),
});

// const binderhubRegistrySchema = z.object({
//   registryJson: z.string().url(),
// });

const termsSchema = z.object({
  text: z.string(),
  href: z.string(),
  title: z.string(),
});

const privacySchema = z.object({
  text: z.string(),
  href: z.string(),
  title: z.string(),
});

// const emailSchema = z.object({
//   help: z.string().email(),
// });

const footerSchema = z.object({
  copyright: z.string(),
  link: z.object({
    href: z.string().url(),
    text: z.string(),
  }),
});

// const loginProviderSchema = z.object({
//   name: z.string(),
//   text: z.string(),
//   disabled: z.boolean(),
//   loginRoute: z.string().url(),
//   buttonStyle: z.string(),
// });

const topNavItemSchema = z.object({
  route: z.string(),
  display: z.string(),
});

const searchSortingSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const searchOrderingSchema = z.object({
  value: z.string(),
  label: z.string(),
});

const searchDetailsSchema = z.object({
  field: z.string(),
  label: z.string(),
});

// const mainFieldSchema = z.object({
//   display: z.string(),
//   name: z.string(),
// });

const headMetaSchema = z.object({
  name: z.string(),
  content: z.string(),
});

const helpersSchema = z.object({
  id: z.string(),
  display: z.string(),
  url: z.string().url(),
  definition: z.string(),
});

const collectionSchema = z.object({
  name: z.object({
    display: z.string(),
    name: z.string(),
  }),
  top: z.array(
    z.object({
      display: z.string(),
      name: z.string(),
    }),
  ),
  meta: z.object({
    hide: z.array(z.string()),
  }),
  // relationships: z.array(
  //   z.object({
  //     name: z.string(),
  //     display: z.string(),
  //     type: z.string(),
  //   }),
  // ),
});

const objectSchema = z.object({
  name: z.object({
    display: z.string(),
    name: z.string(),
  }),
  top: z.array(
    z.object({
      display: z.string(),
      name: z.string(),
    }),
  ),
  meta: z.object({
    hide: z.array(z.string()),
  }),
});

const fileSchema = z.object({
  meta: z.object({
    hide: z.array(z.string()),
  }),
});

// const notebookSchema = z.object({
//   name: z.object({
//     display: z.string(),
//     name: z.string(),
//   }),
//   top: z.array(
//     z.object({
//       display: z.string(),
//       name: z.string(),
//     }),
//   ),
//   meta: z.object({
//     hide: z.array(z.string()),
//     displayHasMember: z.boolean(),
//     displayHasPart: z.boolean(),
//   }),
// });

const uiSchema = z.object({
  // siteName: z.string(),
  // siteNameX: z.string(),
  // publicPath: z.string().url(),
  // title: z.string(),
  shortTitle: z.string().optional(),
  // splashText: z.string(),
  // splashTextClass: z.string(),
  // splashImage: z.string(),
  // splashEnabled: z.boolean(),
  splashLauncher: z.string(),
  showLogo: z.boolean().optional(),
  showEllipsis: z.boolean().optional(),
  navHeight: z.string().optional(),
  // help: helpSchema,
  subHelpLinks: z.array(subHelpLinkSchema).optional(),
  googleForm: googleFormSchema,
  // binderhubRegistry: binderhubRegistrySchema,
  terms: termsSchema,
  privacy: privacySchema,
  // email: emailSchema,
  footer: footerSchema,
  login: z.object({
    enabled: z.boolean(),
  }),
  // authorizationProvider: z.object({
  //   label: z.string(),
  //   url: z.string().url(),
  // }),
  // loginProviders: z.array(loginProviderSchema),
  // enrollment: z.object({
  //   enforced: z.boolean(),
  //   URL: z.string().url(),
  // }),
  topNavItems: z.array(topNavItemSchema).optional(),
  topNavHome: z.string().optional(),
  search: z
    .object({
      sorting: z.array(searchSortingSchema),
      searchSorting: searchSortingSchema,
      ordering: z.array(searchOrderingSchema),
      defaultOrder: searchOrderingSchema,
      searchDetails: z.array(searchDetailsSchema),
    })
    .optional(),
  main: z.object({
    //   fields: z.array(mainFieldSchema),
    //   byteFields: z.array(z.string()),
    expand: z.array(z.string()),
  }),
  head: z.object({
    meta: z.array(headMetaSchema),
  }),
  collection: collectionSchema,
  object: objectSchema,
  file: fileSchema,
  // notebook: notebookSchema,
  helpers: z.array(helpersSchema),
  // baseVocab: z.string().url(),
  analytics: z
    .object({
      gaMeasurementId: z.string(),
    })
    .optional(),
});

const apiSchema = z.object({
  rocrate: z.object({
    endpoint: z.string().url(),
    path: z.string(),
    clientId: z.string().optional(),
    clientSecret: z.string().optional(),
  }),
  // authorization: z.object({
  //   provider: z.string(),
  //   enrollment: z.object({
  //     enforced: z.boolean(),
  //     groups: z.array(z.string()),
  //     URL: z.string().url(),
  //   }),
  //   rems: z.object({
  //     apiUser: z.string(),
  //     apiKey: z.string(),
  //     apiHost: z.string().url(),
  //   }),
  // }),
  // authentication: z.object({
  //   cilogon: z.object({
  //     clientID: z.string(),
  //     clientSecret: z.string(),
  //     redirect_uri: z.string().url(),
  //     authorizeHost: z.string().url(),
  //     authorizePath: z.string(),
  //     tokenHost: z.string().url(),
  //     tokenPath: z.string(),
  //     user: z.string().url(),
  //     bearer: z.string(),
  //     scope: z.string(),
  //     use_refresh_token: z.boolean(),
  //     expirationWindowSeconds: z.number(),
  //     prompt: z.string(),
  //     state: z.string(),
  //     oauthType: z.string(),
  //     useFormData: z.boolean(),
  //     memberOf: z.string(),
  //     userid: z.string(),
  //     username: z.string(),
  //   }),
  //   github: z.object({
  //     clientID: z.string(),
  //     clientSecret: z.string(),
  //     redirect_uri: z.string().url(),
  //     authorizeHost: z.string().url(),
  //     authorizePath: z.string(),
  //     tokenHost: z.string().url(),
  //     tokenPath: z.string(),
  //     user: z.string().url(),
  //     bearer: z.string(),
  //     scope: z.string(),
  //     state: z.string(),
  //     oauthType: z.string(),
  //     useHeaders: z.boolean(),
  //     userid: z.string(),
  //     username: z.string(),
  //   }),
  // }),
  licenses: z.array(
    z.object({
      license: z.string(),
      group: z.string(),
      access: z.string(),
      enrollment: z
        .object({
          url: z.string().url().optional(),
          label: z.string().optional(),
          class: z.string().optional(),
        })
        .optional(),
    }),
  ),
  // licenseGroup: z.string(),
  // license: z.object({
  //   default: z.object({
  //     '@id': z.string().url(),
  //     '@type': z.string(),
  //     metadataIsPublic: z.boolean(),
  //     allowTextIndex: z.boolean(),
  //     name: z.string(),
  //     description: z.string(),
  //   }),
  //   defaultMetadata: z.object({
  //     id: z.string().url(),
  //     name: z.string(),
  //     description: z.string(),
  //     isPublic: z.boolean(),
  //   }),
  // }),
  // identifier: z.object({
  //   main: z.string(),
  // }),
  // elastic: z.object({
  //   bootstrap: z.boolean(),
  //   node: z.string().url(),
  //   maxScroll: z.number(),
  //   scrollTimeout: z.string(),
  //   log: z.string(),
  //   index: z.string(),
  //   indexConfiguration: z.object({
  //     mapping: z.object({
  //       total_fields: z.object({
  //         limit: z.number(),
  //       }),
  //     }),
  //     max_result_window: z.number(),
  //     highlight: z.object({
  //       max_analyzer_offset: z.number(),
  //     }),
  //   }),
  //   fields: z.object({
  //     'name.@value': z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //     'description.@value': z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //     'language.name.@value': z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //     'language.alternateName.@value': z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //     'contributor.@value': z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //     'creator.@value': z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //     _text: z.object({
  //       label: z.string(),
  //       checked: z.boolean(),
  //     }),
  //   }),
  //   aggregations: z.array(
  //     z.object({
  //       display: z.string(),
  //       order: z.number(),
  //       name: z.string(),
  //       field: z.string(),
  //       active: z.boolean().optional(),
  //       help: z.string().optional(),
  //       hide: z.boolean().optional(),
  //       icons: z.boolean().optional(),
  //     }),
  //   ),
  //   highlightFields: z.array(z.string()),
  //   test: z.object({
  //     filters: z.object({
  //       'hasFile.language.name': z.array(z.string()),
  //     }),
  //     '@type': z.array(z.string()),
  //   }),
  //   mappingFieldLimit: z.number(),
  //   mappings: z.object({
  //     date_detection: z.boolean(),
  //     properties: z.object({
  //       _contentLocation: z.object({
  //         type: z.string(),
  //       }),
  //       _centroid: z.object({
  //         type: z.string(),
  //       }),
  //       '@id': z.object({
  //         type: z.string(),
  //       }),
  //       hasFile: z.object({
  //         type: z.string(),
  //         properties: z.object({
  //           language: z.object({
  //             type: z.string(),
  //             properties: z.object({
  //               name: z.object({
  //                 type: z.string(),
  //                 properties: z.object({
  //                   '@value': z.object({
  //                     type: z.string(),
  //                   }),
  //                 }),
  //               }),
  //             }),
  //           }),
  //         }),
  //       }),
  //     }),
  //   }),
  // }),
  // admin: z.object({
  //   indexRoutes: z.boolean(),
  // }),
  conformsTo: z.object({
    collection: z.string().url(),
    object: z.string().url(),
    notebook: z.string().url(),
  }),
  // skipByMatch: z.array(z.unknown()),
});

export type ConfigurationSchema = z.infer<typeof configurationSchema>;

const configurationSchema = z.object({
  ui: uiSchema,
  api: apiSchema,
});

export const configuration = configurationSchema.parse(configurationJSON);
