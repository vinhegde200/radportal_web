import { ApiResponse, AppUserData, Branding, ConsumerCompany } from "../model/access.model";

export class BrandingTestData {
    comp_title: ApiResponse<ConsumerCompany> = {
        data: {
            title: "Testing Company"
        }
    }

    comp_name: ApiResponse<ConsumerCompany> = {
        data: {
            name: "Testing Company Name"
        }
    }

    comp: ApiResponse<ConsumerCompany> = {
        data: {
            id: 1,
            name: "Test Company",
            title: "Test Company Title",
            website: "testwebsite.com",
            domain: "testsite.com"
        }
    }

    branding: ApiResponse<Branding> = {
        data: {
            introtext: "This is company intro text"
        }
    }

    user: ApiResponse<AppUserData> = {
        data: {
            username: "Demo User"
        }
    }

    user_1: ApiResponse<AppUserData> = {
        data: {
            id: 1,
            username: "Demo User",
            email: "demo@test.com",
            roles: [
                {
                    name: "admin"
                },
                {
                    name: "user"
                }
            ]
        }
    }
}