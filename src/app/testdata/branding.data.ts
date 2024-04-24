import { AppUserData, Branding, ConsumerCompany } from "../model/access.model";

export class BrandingTestData {
    comp_title: ConsumerCompany = {
        title: "Testing Company"
    }

    comp_name: ConsumerCompany = {
        name: "Testing Company Name"
    }

    comp: ConsumerCompany = {
        id: 1,
        name: "Test Company",
        title: "Test Company Title",
        website: "testwebsite.com",
        domain: "testsite.com"
    }

    branding: Branding = {
        introtext: "This is company intro text"
    }

    user: AppUserData = {
        username: "Demo User"
    }

    user_1: AppUserData = {
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