package com.myorg.tools.documentworkflow.rest.resources;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

import com.myorg.tools.documentworkflow.model.User;

@Provider
@Path("/useradmin")
public interface UserAdminService {

	   /* To populate User List*/
	   @GET
	   @Path("/users")
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response populateUsersList();
	   
	   /* To populate a particular User Detail - password setting UI*/
	   @GET
	   @Path("/userdetail")
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response populateUserDetail(@QueryParam("userId") String userId);
	  
	   /* To populate Master Role List */
	   @GET
	   @Path("/roles")
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response populateMasterRoleList();

	   /* To populate Users for a given Role */
	   @GET
	   @Path("/roleusermap")
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response populateRoleUserMapping(@QueryParam("roleId") Integer roleId);

	   /* To populate Users for a given Role */
	   @GET
	   @Path("/unmappedroleuser")
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response populateUnmappedRoleUserbase(@QueryParam("roleId") Integer roleId);

/*	    To update Role User Mapping 
	   @GET
	   @Path("/updateroleusermap")
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response updateRoleUserMapping();
	   
	    To update user detail 
	   @GET
	   @Path("/updateuserdetail")
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response updateUserDetail(User user);

	    To update user base 
	   @GET
	   @Path("/updateuserbase")
	   @Consumes(MediaType.APPLICATION_JSON)
	   @Produces(MediaType.APPLICATION_JSON)	   
	   public Response updateUserbase(List<User> usersList);
*/
}
