# ParkInsight - Satis
Private package hosting via satis. Packages will be hosted at [https://satis.internal.parkinsight.io/](https://satis.internal.parkinsight.io/).

## Building packages
Whenever a new version of one of the private packages has been tagged, or whenever a new package is added to satis (see below), you will need to run the build process. This can be done by triggering the [Publish to GitHub Pages](https://github.com/yourparkingspace/pi-satis/actions/workflows/github_pages.yml) GitHub action for this repository.

## Adding a new package
To add a new package simple update the `satis.json` file in this repository, including the URL to the GitHub page for the package's repository

## Using a private package
To use any of the packages hosted at [https://satis.internal.parkinsight.io/](https://satis.internal.parkinsight.io/) add the following to your `composer.json` file.

```json
{
    "repositories": [
        {
            "type": "composer",
            "url": "https://satis.internal.parkinsight.dev/"
        }
    ]
}
```

You can then install the package as usual using `composer install`.
