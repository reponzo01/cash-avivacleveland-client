import Organization from "@/models/organization";
import axios from "axios";
import { defineStore } from "pinia";

export const useOrganizationStore = defineStore('organizationStore', {
  state: () => ({
    organizations: [] as Organization[],
    organizationsLoaded: false,
    errorMessage: ''
  }),
  getters: {
    async getMyOrganizations(state) {
      if (!state.organizationsLoaded) {
        try {
          const res = await axios.get('api/organizations');
          if (res.status == 200) {
            state.organizations = <Organization[]>res.data;
            state.organizationsLoaded = true;
          }
        } catch (err) {
          console.log(err);
        }
      }

      return state.organizations;
    }
  },
  actions: {
    changeMyStore(newName: string) {
      //this.organizationName = newName;
    },
    async addNewOrganization(name: string, description: string) {
      this.errorMessage = '';
      try {
        const newOrganization: Organization = {
          id: 0,
          name: name,
          description: description,
          organizationUserRoles: []
        };
        const res = await axios.post('/api/organizations', newOrganization);
        if (res.status == 201) {
          this.organizations.push(<Organization>res.data);
        }
      } catch (err: any) {
        this.errorMessage = err.response.data;
      }
    }
  }
});
