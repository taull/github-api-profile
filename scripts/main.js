(function(){
  'use strict';

  var repoResults = rawRepoData;
  var sidebar = rawUserData;

  $(document).ready(function(){

//Sidebar

    var $sidebar = $('.sidebar-list');

      var sidebarText = renderTemplate('sidebar-list', {
        image: sidebar.avatar_url,
        name: sidebar.name,
        user: sidebar.login,
        company: sidebar.company,
        email: sidebar.email,
        location: sidebar.location,
        joined: sidebar.created_at,
      });
      $sidebar.append(sidebarText);



//Repo Content

    var $repo = $('.repo-list');

    repoResults.forEach(function(repo){
      var repoText = renderTemplate('repo-list', {
        name: repo.name,
        language: repo.language,
        starred: repo.stargazers_count,
        forks: repo.forks_count,
        created: repo.created_at,
      });
      $repo.append(repoText);
    });
  });

  function renderTemplate(name, data) {
    var $template = $('[data-template-name=' + name + ']').text();
    $.each(data, function(prop, value) {
      $template = $template.replace('<% ' + prop + ' %>', value);
    });
    return $template;
  }

})();
