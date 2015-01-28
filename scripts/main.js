(function(){
  'use strict';

  // var repoResults = rawRepoData;
  // var sidebar = rawUserData;


    // var repoTemplate = _.template($('[data-template-name=repo]').text());
    // var $repositoriesUl = $('.repo-list');
    // var sidebarTemplate = _.template($('[data-template-name=sidebar]').text());
    // var $sidebarUl = $('.sidebar-list');
    //
    // $.ajax(baseURL + "/repos").done(function(repos){
    //   _.each(repos, function(repo){
    //     $repositoriesUl.append(repoTemplate(repo));
    //   });
    // });
    //
    // $.ajax(baseURL + "").done(function(sidebars){
    //   _.each(sidebars, function(sidebar){
    //     $sidebarUl.append(sidebarTemplate(sidebar));
    //   });
    // });


var baseURL = "https://api.github.com/users/taull";
var repoTemplate = _.template($('[data-template-name=repo]').text());
var $repo = $('.repo-list');
var $sidebar = $('.sidebar-list');


  $(document).ready(function(){
    if(typeof githubToken !== 'undefined'){
    $.ajaxSetup({
      headers: {'Authorization': 'token ' + githubToken}
    });
  }

//Sidebar

    $.ajax(baseURL + "").done(function(sidebars){

      console.log(sidebars);

      var sidebarText = renderTemplate('sidebar-list', {
        image: sidebars.avatar_url,
        name: sidebars.name,
        user: sidebars.login,
        company: sidebars.company,
        email: sidebars.email,
        location: sidebars.location,
        joined: moment(sidebars.created_at).format('MMM Do, YYYY'),
        followers: sidebars.followers,
        following: sidebars.following,
        organizations: sidebars.organizations_url,

      });
      $sidebar.append(sidebarText);
  });

//Repo Content

  $.ajax(baseURL + "/repos").done(function(repos){

    console.log(repos);
    _.each(repos, function(repo){
      var repoText = renderTemplate('repo-list', {
        name: repo.name,
        language: repo.language,
        starred: repo.stargazers_count,
        forks: repo.forks_count,
        updated: moment(repo.updated_at).fromNow(),
      });
      $repo.append(repoText);
    });
  });
});

  function renderTemplate(name, data) {
    var $template = $('[data-template-name=' + name + ']').text();
    $.each(data, function(prop, value) {
      $template = $template.replace(new RegExp('<% ' + prop + ' %>', 'g'), value);
    });
    return $template;
    }

})();
