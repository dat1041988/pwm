import { Component } from '../component';
import { IScope } from 'angular';
import PeopleSearchService from './peoplesearch.service';
import Person from '../models/person.model';


@Component({
    stylesheetUrl: require('peoplesearch/peoplesearch-table.component.scss'),
    templateUrl: require('peoplesearch/peoplesearch-table.component.html')
})
export default class PeopleSearchTableComponent {
    private deregistrationCallback: () => void;
    people: Person[];

    static $inject = [ '$scope', 'PeopleSearchService' ];
    constructor(
        private $scope: IScope,
        private peopleSearchService: PeopleSearchService) {
    }

    $onInit() {
        this.getPeople();

        var self = this;
        this.deregistrationCallback = this.$scope.$on('people-updated', () => {
            self.getPeople();
        });
    }

    $onDestroy() {
        this.deregistrationCallback();
    }

    getPeople() {
        this.people = this.peopleSearchService.people;
    }
}
