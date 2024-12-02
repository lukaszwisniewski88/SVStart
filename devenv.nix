{ pkgs
, lib
, config
, inputs
, ...
}: {
  # https://devenv.sh/basics/

  env.TZ = "UTC";
  env.NODE_ENV = "development";
  # https://devenv.sh/packages/
  packages = [ pkgs.git pkgs.prisma pkgs.prisma-engines pkgs.openssl ];

  # https://devenv.sh/languages/
  # languages.rust.enable = true;

  # https://devenv.sh/processes/
  # processes.cargo-watch.exec = "cargo-watch";

  # https://devenv.sh/services/
  # services.postgres.enable = true;

  # https://devenv.sh/scripts/
  scripts.hello.exec = ''
    echo hello from $GREET
  '';

  languages.javascript = {
    enable = true;
    bun = {
      package = pkgs.bun;
      enable = true;
      install.enable = true;
    };
  };
  enterShell = with pkgs; ''
    export PRISMA_SCHEMA_ENGINE_BINARY="${prisma-engines}/bin/schema-engine"
    export PRISMA_QUERY_ENGINE_BINARY="${prisma-engines}/bin/query-engine"
    export PRISMA_QUERY_ENGINE_LIBRARY="${prisma-engines}/lib/libquery_engine.node"
    export PRISMA_FMT_BINARY="${prisma-engines}/bin/prisma-fmt"
  '';

  # https://devenv.sh/tasks/
  # tasks = {
  #   "myproj:setup".exec = "mytool build";
  #   "devenv:enterShell".after = [ "myproj:setup" ];
  # };

  # https://devenv.sh/tests/
  enterTest = ''
    echo "Running tests"
    git --version | grep --color=auto "${pkgs.git.version}"
  '';

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # See full reference at https://devenv.sh/reference/options/
}
